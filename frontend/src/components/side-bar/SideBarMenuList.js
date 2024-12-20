import React, { useState } from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import SideBarMenu from "@components/side-bar/SideBarMenu";
import { ReactComponent as HomeIcon } from "@assets/images/icon-nav-overview.svg";
import { ReactComponent as TransactionsIcon } from "@assets/images/icon-nav-transactions.svg";
import { ReactComponent as BudgetsIcon } from "@assets/images/icon-nav-budgets.svg";
import { ReactComponent as PotsIcon } from "@assets/images/icon-nav-pots.svg";
import { ReactComponent as RecurringBillsIcon } from "@assets/images/icon-nav-recurring-bills.svg";
import { ReactComponent as UserIcon } from "@assets/images/user-icon.svg";

const menuItems = [
  { id: 1, label: "Overview", icon: HomeIcon },
  { id: 2, label: "Transactions", icon: TransactionsIcon },
  { id: 3, label: "Budgets", icon: BudgetsIcon },
  { id: 4, label: "Pots", icon: PotsIcon },
  { id: 5, label: "Recurring Bills", icon: RecurringBillsIcon },
  { id: 6, label: "User Info", icon: UserIcon },
];

const SideBarMenuList = ({ activeMenu, setActiveMenu, isSidebarMinimized }) => {
  const [currentActive, setCurrentActive] = useState(activeMenu);

  const handleMenuClick = (targetId) => {
    const totalDuration = 100;
    const startTime = performance.now();
    const startMenu = currentActive;
    const distance = targetId - startMenu;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);

      const currentMenu = Math.round(startMenu + progress * distance);
      setCurrentActive(currentMenu);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setActiveMenu(targetId);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <Box
      className="sidebar-menu-list"
      sx={{
        margin: {
          xs: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)}`,
          sm: `${pxToRem(0)} ${pxToRem(0)}`,
          md: `${pxToRem(24)} ${pxToRem(0)} `,
        },
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: { xs: "space-between", md: "flex-start" },
        gap: { xs: pxToRem(0), md: pxToRem(4) },
        whiteSpace: "nowrap",
        height: "100%",
      }}>
      {menuItems.map((menu) => {
        const Icon = menu.icon;
        const isActive = currentActive === menu.id;

        return (
          <SideBarMenu
            key={menu.id}
            label={menu.label}
            icon={
              <Icon
                className={`sidebar-menu-icon ${isActive ? "active" : ""}`}
              />
            }
            active={isActive}
            onClick={() => handleMenuClick(menu.id)}
            isSidebarMinimized={isSidebarMinimized}
          />
        );
      })}
    </Box>
  );
};

export default SideBarMenuList;
