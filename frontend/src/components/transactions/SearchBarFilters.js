import React from "react";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import BasicInput from "@components/inputFields/BasicInput";
import { pxToRem } from "@utils/pxToRem";
import SearchIcon from "@assets/images/icon-search.svg";
import SortIcon from "@assets/images/icon-sort-mobile.svg";
import CategoryIcon from "@assets/images/icon-filter-mobile.svg";
import { useTheme } from "@mui/material/styles";

const SearchBarFilters = ({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  handleKeyPress,
  sort,
  setSort,
  category,
  setCategory,
  sortOptions,
  categoryOptions,
  hideSearch = false,
  hideSort = false,
  hideCategory = false,
  handleSortClick,
  handleCategoryClick,
  sortAnchor,
  openSortMenu,
  setSortAnchor,
  categoryAnchor,
  openCategoryMenu,
  setCategoryAnchor,
  placeholder,
}) => {
  const theme = useTheme();

  const handleSortSelect = (value) => {
    setSort(value);
    setSortAnchor(null);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
    setCategoryAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: pxToRem(24),
        width: "100%",
        marginBottom: pxToRem(24),
      }}>
      {/* Campo di ricerca */}
      {!hideSearch && (
        <BasicInput
          sx={{
            marginBottom: pxToRem(0),
            maxWidth: { xs: "unset", sm: pxToRem(300) },
            width: "100%",
          }}
          value={searchInput}
          placeholder={placeholder}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          endIcon={
            <InputAdornment
              position="end"
              sx={{
                marginRight: pxToRem(0),
                cursor: "pointer",
              }}>
              <IconButton onClick={handleSearchSubmit}>
                <img
                  src={SearchIcon}
                  alt="Search Icon"
                  style={{ width: pxToRem(16), height: pxToRem(16) }}
                />
              </IconButton>
            </InputAdornment>
          }
        />
      )}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: pxToRem(24),
        }}>
        {/* Filtro ordinamento */}
        {!hideSort && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: pxToRem(8),
            }}>
            <Typography
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[500],
                whiteSpace: "nowrap",
              }}>
              Sort by
            </Typography>
            <BasicInput
              sx={{
                maxWidth: pxToRem(113),
                width: "100%",
                marginBottom: pxToRem(0),
              }}
              options={sortOptions}
              value={sort}
              onChange={(selected) => setSort(selected.value)}
            />
          </Box>
        )}
        {/* Filtro categoria */}
        {!hideCategory && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: pxToRem(8),
            }}>
            <Typography
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[500],
                whiteSpace: "nowrap",
              }}>
              Category
            </Typography>
            <BasicInput
              sx={{
                maxWidth: pxToRem(177),
                width: "100%",
                marginBottom: pxToRem(0),
              }}
              options={categoryOptions}
              value={category}
              onChange={(selected) => setCategory(selected.value)}
            />
          </Box>
        )}
      </Box>
      {/* Icone mobile per filtri */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: pxToRem(64),
          width: "100%",
        }}>
        {!hideSort && (
          <Box onClick={handleSortClick}>
            <img
              src={SortIcon}
              alt="Sort Icon"
              style={{
                width: pxToRem(15),
                height: pxToRem(15),
                cursor: "pointer",
              }}
            />
          </Box>
        )}
        {!hideCategory && (
          <Box onClick={handleCategoryClick}>
            <img
              src={CategoryIcon}
              alt="Category Icon"
              style={{
                width: pxToRem(15),
                height: pxToRem(15),
                cursor: "pointer",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Menu per Sort */}
      {!hideSort && (
        <Menu
          sx={{ marginTop: pxToRem(16) }}
          anchorEl={sortAnchor}
          open={openSortMenu}
          onClose={() => setSortAnchor(null)}>
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortSelect(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Menu per Category */}
      {!hideCategory && (
        <Menu
          sx={{ marginTop: pxToRem(16) }}
          anchorEl={categoryAnchor}
          open={openCategoryMenu}
          onClose={() => setCategoryAnchor(null)}>
          {categoryOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleCategorySelect(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
};

export default SearchBarFilters;
