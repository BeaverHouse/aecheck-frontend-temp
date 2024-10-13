import { MainWrapperSx } from "../../constants/style";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <Box sx={MainWrapperSx}>
      {t("frontend.server.error")}
    </Box>
  );
}

export default ErrorPage;
