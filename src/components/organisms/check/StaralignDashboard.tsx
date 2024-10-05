import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getNumber, getShortName, getStep } from "../../../util/func";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FlexCenter } from "../../../constants/style";
import CharacterStaralign from "../../molecules/character/Staralign";
import StaralignFilterButton from "../../atoms/button/StaralignFilter";

function StaralignDashboard({ filteredCharacters }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { staralign } = useCheckStore();
  const { staralignStatusFilter } = useFilterStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.isAwaken)
    .filter((char) =>
      staralignStatusFilter.includes(getStep(getNumber(char), staralign))
    )
    .sort((a, b) =>
      getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      )
    );

  return (
    <Container
      sx={{
        ...FlexCenter,
        flexDirection: "column",
        border: "gray 1px solid",
        height: "100%",
        padding: "2px",
      }}
    >
      <Typography variant="h6" component="div">
        {t("frontend.word.staralign")}
      </Typography>
      <StaralignFilterButton />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          overflow: "auto",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {targetCharacters.map((char) => (
            <CharacterStaralign key={`align-${char.id}`} {...char} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default StaralignDashboard;
