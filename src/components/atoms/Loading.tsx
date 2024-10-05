import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
function Loading() {
  return (
    <Box sx={{ width: "95%", margin: "0 auto", mt: 30, textAlign: "center", minHeight: 500 }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
