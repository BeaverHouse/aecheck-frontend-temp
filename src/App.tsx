import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import useConfigStore from "./store/useConfigStore";
import { darkPalette, lightPalette } from "./constants/theme";
import GlobalModal from "./components/molecules/GlobalModal";
import useModalStore from "./store/useModalStore";
import "./index.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ThemeOptions } from "./constants/enum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AnnounceSwal = withReactContent(Swal);

function App() {
  const { i18n } = useTranslation();
  const { theme } = useConfigStore();
  const { modalType } = useModalStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  useEffect(() => {
    AnnounceSwal.fire({
      title: "Now Testing",
      html:
        i18n.language === "ko" ? (
          <div>
            <p>현재 사이트 테스트중입니다.</p>
            <br />
            <p>아직 미완성이고, 충분한 보완과 테스트 과정을 거친 뒤 반영될 예정입니다.</p>
            <p>문의는 블로그 또는 이메일을 통해 부탁드립니다.</p>
            <br />
            <a
              href="https://aecheck.tistory.com/"
              target="_blank"
              rel="noreferrer"
            >
              사이트 안내용 블로그
            </a>
            <br />
            <a
              href="mailto:haulrest@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              이메일
            </a>
            <br />
          </div>
        ) : (
          <div>
            <p>This website is under testing.</p>
            <br />
            <p>Some features are incomplete or under development. It'll be tested carefully before release.</p>
            <p>If you find any bugs, please email me or report them via GitHub.</p>
            <br />
            <a
              href="https://github.com/BeaverHouse/aecheck-v3"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <br />
            <a
              href="mailto:haulrest@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              E-mail
            </a>
            <br />
          </div>
        ),
      icon: "info",
    });
  }, [i18n.language]);

  const selectedTheme = createTheme({
    palette: theme === ThemeOptions.dark ? darkPalette : lightPalette,
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <GlobalModal type={modalType} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
