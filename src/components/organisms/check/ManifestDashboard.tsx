import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getManifestStatus, getNumber, getShortName } from "../../../util/func";
import CharacterManifest from "../../molecules/character/Manifest";
import Box from "@mui/material/Box";
import { FlexCenter } from "../../../constants/style";
import ManifestFilterButton from "../../atoms/button/ManifestFilter";
import Button from "@mui/material/Button";

function ManifestDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { manifestStatusFilter } = useFilterStore();
  const { inven, manifest, setManifest } = useCheckStore();

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

  const checkAll = () => {
    const ids = targetCharacters.map((char) => getNumber(char));

    const newManifest = [
      ...manifest.filter((i) => !ids.includes(i % 10000)),
      ...targetCharacters
        .filter(
          (char) => char.maxManifest > 0 && inven.includes(getNumber(char))
        )
        .map((char) => char.maxManifest * 10000 + getNumber(char)),
    ];

    setManifest(newManifest);
  };

  const uncheckAll = () => {
    const ids = targetCharacters.map((char) => getNumber(char));

    const newManifest = [...manifest.filter((i) => !ids.includes(i % 10000))];

    setManifest(newManifest);
  };

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
      <Box sx={{ ...FlexCenter, flexWrap: "wrap" }}>
        <ManifestFilterButton />
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 0.5 }}
          onClick={() => uncheckAll()}
        >
          CLEAR ALL
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ m: 0.5 }}
          onClick={() => checkAll()}
        >
          CHECK ALL
        </Button>
      </Box>
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
