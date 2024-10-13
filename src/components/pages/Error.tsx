import { MainWrapperSx } from "../../constants/style";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <Box sx={MainWrapperSx} flexDirection="column">
      <Typography variant="h6" sx={{ m: 2 }}>
        {t("frontend.server.error")}
      </Typography>
      <img src="/error.png" alt="error" style={{ width: 200 }} />
      <br/>
      <br/>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        endIcon={<RefreshIcon />}
      >
        Refresh
      </Button>
    </Box>
  );
}

export default ErrorPage;
