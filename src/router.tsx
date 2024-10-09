import { Outlet, createBrowserRouter } from "react-router-dom";
import ScrollTop from "./components/atoms/button/ScrollTop";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import AECheckMenu from "./components/organisms/Menu";
import HomePage from "./components/pages/Home";
import CheckPage from "./components/pages/Check";
import SearchPage from "./components/pages/Search";
import AnalysisPage from "./components/pages/Analysis";
import LinkPage from "./components/pages/Link";
import CssBaseline from "@mui/material/CssBaseline";

const router = createBrowserRouter([
  {
    element: (
      <>
        <CssBaseline />
        <AECheckMenu />
        <Toolbar id="back-to-top-anchor" sx={{ height: { xs: 90, sm: 60 } }} />
        <Outlet />
        <ScrollTop>
          <Fab size="small" color="secondary" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/check",
        element: <CheckPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/analysis",
        element: <AnalysisPage />,
      },
      {
        path: "/link",
        element: <LinkPage />,
      },
    ],
  },
]);

export default router;
