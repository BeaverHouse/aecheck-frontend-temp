import Box from "@mui/material/Box";
import LanguageButton from "../atoms/button/Language";
import { FlexCenter } from "../../constants/style";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import { LanguageOptions, MenuOptions, ModalType } from "../../constants/enum";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LinkIcon from "@mui/icons-material/Link";
import useModalStore from "../../store/useModalStore";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppInfo } from "../../constants";
import Loading from "../atoms/Loading";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h6,
  ...FlexCenter,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  height: 80,
  flexDirection: "column",
  cursor: "pointer",
}));

function HomePage() {
  const { t } = useTranslation();
  const { setModal } = useModalStore();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["getCharacters"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/character`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  const characters = (data as APIResponse<CharacterSummary[]>).data;
  const totalCodes = Array.from(new Set(characters.map((c) => c.code)));

  const guideLink =
    i18n.language === LanguageOptions.ko
      ? AppInfo.koGuideLink
      : AppInfo.enGuideLink;

  const menuData = [
    {
      label: MenuOptions.check,
      icon: <CheckCircleOutlineIcon />,
    },
    {
      label: MenuOptions.search,
      icon: <SearchIcon />,
    },
    {
      label: MenuOptions.analysis,
      icon: <AssessmentIcon />,
    },
    {
      label: MenuOptions.link,
      icon: <LinkIcon />,
    },
  ];

  return (
    <Box
      sx={{
        ...FlexCenter,
        minHeight: 500,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          margin: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Total Characters : {totalCodes.length + 23}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ( {totalCodes.length} + 23 3★ {t("frontend.word.character")} )
        </Typography>

        <Grid container spacing={1} sx={{ mt: 2, mb: 2 }}>
          {menuData.map((menu) => (
            <Grid size={6} key={menu.label}>
              <Item onClick={() => navigate(`/${menu.label}`)}>
                {menu.icon}
                {t(`frontend.menu.${menu.label}`)}
              </Item>
            </Grid>
          ))}
          <Grid size={12}>
            <Item onClick={() => window.open(guideLink, "_blank")}>
              About {AppInfo.name}
            </Item>
          </Grid>
          <Grid size={12}>
            <Item onClick={() => setModal(ModalType.dataLoader)}>
              {t("frontend.menu.loader")}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <LanguageButton />
    </Box>
  );
}

export default HomePage;
