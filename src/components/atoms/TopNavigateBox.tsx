import React from "react";
import { useTranslation } from "react-i18next";
import useConfigStore from "../../store/useConfigStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  AnalysisPageOptions,
  MenuOptions,
  SearchCheckPageOptions,
} from "../../constants/enum";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const TopNavigateBox: React.FC = () => {
  const { t } = useTranslation();
  const {
    lastCheck,
    lastSearch,
    lastAnalysis,
    updateLastCheck,
    updateLastSearch,
    updateLastAnalysis,
  } = useConfigStore();

  const path = window.location.pathname;
  const category = path.split("/")[1] as MenuOptions;

  if (category !== MenuOptions.check && category !== MenuOptions.search && category !== MenuOptions.analysis) return null;

  const currentOption = {
    [MenuOptions.analysis]: lastAnalysis,
    [MenuOptions.search]: lastSearch,
    [MenuOptions.check]: lastCheck,
  }[category];
  const options =
    category === MenuOptions.analysis
      ? AnalysisPageOptions
      : SearchCheckPageOptions;

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    switch (category) {
      case MenuOptions.check:
        updateLastCheck(value as SearchCheckPageOptions);
        break;
      case MenuOptions.search:
        updateLastSearch(value as SearchCheckPageOptions);
        break;
      case MenuOptions.analysis:
        updateLastAnalysis(value as AnalysisPageOptions);
        break;
    }
  };

  return (
    <Select
      size="small"
      color="secondary"
      value={currentOption}
      sx={{ minWidth: 250, maxWidth: 250, textAlign: "center", m: "0 auto" }}
      onChange={handleChange}
    >
      {Object.values(options).map((option) => (
        <MenuItem key={option} value={option}>
          {t(`frontend.select.${option}`)}
        </MenuItem>
      ))}
      <Divider />
      {Object.values(MenuOptions).map((menu) => (
        <Link to={`/${menu}`} key={menu}>
          <MenuItem>
            <Typography color="secondary">
              {t(`frontend.menu.${menu}`)}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </Select>
  );
};

export default TopNavigateBox;
