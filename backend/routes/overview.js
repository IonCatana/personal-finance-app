const express = require("express");
const mongoose = require("mongoose");
const Budget = require("@models/Budget");
const Pot = require("@models/Pot");
const Transaction = require("@models/Transaction");
const {
  getBalanceSummary,
  buildBalanceResponse,
  roundCurrency,
} = require("../utils/balanceSummary");
const { calculateBillsSummary } = require("../utils/billsSummary");

const router = express.Router();

const OVERVIEW_POTS_LIMIT = 4;
const OVERVIEW_TRANSACTIONS_LIMIT = 5;
const OVERVIEW_BUDGET_ITEMS_LIMIT = 4;

const buildOverviewTransactionsAggregation = (userObjectId) => [
  { $match: { userId: userObjectId } },
  {
    $facet: {
      spendByCategory: [
        {
          $group: {
            _id: "$category",
            spentAmount: { $sum: "$amount" },
          },
        },
      ],
    },
  },
];

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const [
      balanceSummary,
      budgets,
      overviewTransactionsResult,
      potsPreview,
      totalSavedResult,
      recurringTransactions,
    ] = await Promise.all([
      getBalanceSummary(userId),
      Budget.find({ userId })
        .select("category maximum color")
        .sort("category")
        .lean(),
      Transaction.aggregate(buildOverviewTransactionsAggregation(userObjectId)),
      Pot.find({ userId })
        .select("name total color")
        .limit(OVERVIEW_POTS_LIMIT)
        .lean(),
      Pot.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, totalSaved: { $sum: "$total" } } },
      ]),
      Transaction.find({ userId, recurring: true })
        .select("name category amount recurring date")
        .lean(),
    ]);

    const { spendByCategory: budgetSpendByCategory = [] } =
      overviewTransactionsResult[0] || {};

    const spentByCategoryMap = new Map(
      budgetSpendByCategory.map((item) => [
        item._id,
        roundCurrency(item.spentAmount),
      ])
    );

    const budgetsWithSpent = budgets.map((budget) => ({
      ...budget,
      spentAmount: spentByCategoryMap.get(budget.category) || 0,
    }));

    const firstBudget = budgetsWithSpent[0] || null;

    const latestTransactions = firstBudget
      ? await Transaction.find({
          userId,
          category: firstBudget.category,
        })
          .sort({ date: -1 })
          .limit(OVERVIEW_TRANSACTIONS_LIMIT)
          .select("avatar name date amount")
          .lean()
      : [];

    const totalSpent = Math.abs(
      roundCurrency(
        budgetsWithSpent.reduce(
          (sum, budget) => sum + Number(budget.spentAmount || 0),
          0
        )
      )
    );
    const totalLimit = Math.abs(
      roundCurrency(
        budgetsWithSpent.reduce(
          (sum, budget) => sum + Number(budget.maximum || 0),
          0
        )
      )
    );

    const overviewPayload = {
      balance: balanceSummary.balance
        ? buildBalanceResponse(balanceSummary)
        : null,
      potsOverview: {
        totalSaved: roundCurrency(totalSavedResult[0]?.totalSaved || 0),
        items: potsPreview,
      },
      budgetsOverview: {
        chartData: {
          labels: budgetsWithSpent.map((budget) => budget.category),
          datasets: [
            {
              data: budgetsWithSpent.map((budget) =>
                Math.abs(Number(budget.spentAmount || 0))
              ),
              backgroundColor: budgetsWithSpent.map(
                (budget) => budget.color || "#E0E0E0"
              ),
              borderWidth: 0,
            },
          ],
        },
        totalSpent,
        totalLimit,
        items: budgetsWithSpent
          .slice(0, OVERVIEW_BUDGET_ITEMS_LIMIT)
          .map(({ _id, category, maximum, color }) => ({
            _id,
            category,
            maximum,
            color,
          })),
      },
      transactionsOverview: {
        category: firstBudget?.category || null,
        color: firstBudget?.color || null,
        items: latestTransactions,
      },
      billsOverview: calculateBillsSummary(recurringTransactions),
    };

    res.status(200).json(overviewPayload);
  } catch (error) {
    console.error("Errore nel recupero dell'overview:", error);
    res.status(500).json({ error: "Errore nel recupero dell'overview." });
  }
});

module.exports = router;
