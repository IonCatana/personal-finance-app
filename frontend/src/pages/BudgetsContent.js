import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import ChartBudget from "@components/budget/ChartBudget";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { useBudgetsData } from "@hooks/useBudgetsData";
import BudgetCard from "@components/budget/BudgetCard";
import BudgetsInfoCard from "@components/budget/BudgetsInfoCard";
import {
  getBudgets,
  updateBudget,
  deleteBudget,
  createBudget,
} from "@components/budget/apiBudgets";
import ModalCrud from "@components/modals/ModalCrud";

const BudgetsContent = () => {
  const theme = useTheme();

  const [budgets, setBudgets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedBudget, setSelectedBudget] = React.useState(null);
  const { chartData, totalSpent, totalLimit } = useBudgetsData(budgets);

  React.useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        // console.log("Fetched budgets data:", data);
        setBudgets(data || []);
      } catch (error) {
        console.error("Error loading budgets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, []);

  const handleAddBudget = async (newBudgetData) => {
    try {
      const newBudget = await createBudget(newBudgetData);
      setBudgets((prev) => [...prev, newBudget]);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const handleUpdate = async (updatedBudget) => {
    try {
      const updatedBudgetData = await updateBudget(
        updatedBudget._id,
        updatedBudget
      );
      setBudgets((prev) =>
        prev.map((budget) =>
          budget._id === updatedBudget._id ? updatedBudgetData : budget
        )
      );
      setEditModalOpen(false);
      setSelectedBudget(null);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      setBudgets((prev) => prev.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const handleEditModalOpen = (budget) => {
    setSelectedBudget(budget);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedBudget(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SectionHeaderContent
        title="Budgets"
        buttonLabel="+ Add New Budget"
        onButtonClick={() => console.log("Add New Budget clicked!")}
        buttonComponent={ButtonPrimary}
        modalType="addBudget"
        onAddItem={handleAddBudget}
      />
      <Box
        className="budgets-content"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          gap: pxToRem(24),
          justifyContent: "space-between",
        }}>
        <Box
          className="left"
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: pxToRem(428) },
            width: "100%",
            height: "auto",
            backgroundColor: theme.palette.otherColors.white,
            borderRadius: pxToRem(12),
            padding: {
              xs: `${pxToRem(24)} ${pxToRem(20)}`,
              sm: `${pxToRem(32)} ${pxToRem(32)} ${pxToRem(24)} ${pxToRem(32)}`,
              md: `${pxToRem(32)} ${pxToRem(32)} ${pxToRem(24)} ${pxToRem(32)}`,
            },
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "column",
              },
              alignItems: "center",
              gap: pxToRem(32),
              justifyContent: "space-between",
            }}>
            <ChartBudget
              chartData={chartData}
              totalSpent={totalSpent}
              totalLimit={totalLimit}
            />
            {/* Budget details list */}
            <Box
              sx={{
                width: "100%",
              }}>
              <SectionHeaderCard fullWidth title="Spending Summary" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  "& > :last-child": {
                    borderBottom: "none",
                    paddingBottom: 0,
                  },
                  "& > :first-of-type": {
                    paddingTop: pxToRem(4),
                  },
                }}>
                {budgets.map(
                  (budget) =>
                    budget && (
                      <BudgetCard
                        key={budget._id}
                        category={budget.category}
                        spentAmount={budget.spentAmount}
                        maximum={budget.maximum}
                        color={budget.color || "#E0E0E0"}
                      />
                    )
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="right"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(24),
          }}>
          {budgets.map(
            (budget) =>
              budget && (
                <BudgetsInfoCard
                  key={budget._id}
                  _id={budget._id}
                  category={budget.category}
                  maximum={budget.maximum}
                  spentAmount={budget.spentAmount}
                  color={budget.color || "#E0E0E0"}
                  onUpdate={handleEditModalOpen}
                  onDelete={handleDelete}
                />
              )
          )}
        </Box>
      </Box>
      {/* Modal for Edit Budget */}
      <ModalCrud
        open={editModalOpen}
        onClose={handleEditModalClose}
        type="editBudget"
        data={selectedBudget}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default BudgetsContent;
