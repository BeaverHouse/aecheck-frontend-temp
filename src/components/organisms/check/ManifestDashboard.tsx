import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getManifestStatus, getShortName } from "../../../util/func";
import Typography from "@mui/material/Typography";
import CharacterManifest from "../../molecules/character/Manifest";
import Box from "@mui/material/Box";
import { FlexCenter } from "../../../constants/style";
import ManifestFilterButton from "../../atoms/button/ManifestFilter";

function ManifestDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { manifestStatusFilter } = useFilterStore();
  const { inven, manifest } = useCheckStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.maxManifest > 0)
    .filter((char) =>
      manifestStatusFilter.includes(
        getManifestStatus(allCharacters, char, inven, manifest)
      )
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
        {t("frontend.manifest.step1")}
      </Typography>
      <ManifestFilterButton />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          overflow: "auto",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {targetCharacters.map((char) => (
            <CharacterManifest
              key={`manifest-${char.id}`}
              info={char}
              status={getManifestStatus(allCharacters, char, inven, manifest)}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ManifestDashboard;
