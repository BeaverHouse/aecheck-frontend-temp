import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import CharacterDashboard from "../organisms/check/CharacterDashboard";
import ManifestDashboard from "../organisms/check/ManifestDashboard";
import GrastaDashboard from "../organisms/check/GrastaDashboard";
import StaralignDashboard from "../organisms/check/StaralignDashboard";
import useConfigStore from "../../store/useConfigStore";
import BuddyDashboard from "../organisms/check/BuddyDashboard";
import {
  AEAlterStatus,
  AEAwakenStatus,
  AECategories,
  AECharacterStyles,
  AELightShadow,
  AEManifestLevels,
  SearchCheckPageOptions,
} from "../../constants/enum";
import { MainWrapperSx } from "../../constants/style";
import GlobalFilter from "../molecules/GlobalFilter";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import Loading from "../atoms/Loading";
import useMediaQuery from "@mui/material/useMediaQuery";
import { arrAllIncludes, arrOverlap } from "../../util/arrayUtil";

function CheckPage() {
  const { lastCheck } = useConfigStore();
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const { t } = useTranslation();
  const {
    styleFilter,
    manifestFilter,
    categoryFilter,
    alterFilter,
    lightShadowFilter,
    staralignFilter,
    essenTialPersonalityTags,
    choosePersonalityTags,
    dungeon,
    searchWord,
  } = useFilterStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["getCharacters"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/character`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  const allCharacters = (data as APIResponse<CharacterSummary[]>).data;
  const filteredCharacters = allCharacters.filter(
    (char) =>
      styleFilter.includes(char.style as AECharacterStyles) &&
      manifestFilter.includes(char.maxManifest as AEManifestLevels) &&
      categoryFilter.includes(char.category as AECategories) &&
      alterFilter.includes(char.isAlter as AEAlterStatus) &&
      lightShadowFilter.includes(char.lightShadow as AELightShadow) &&
      staralignFilter.includes(char.isAwaken as AEAwakenStatus) &&
      arrAllIncludes(
        char.personalities.map((p) => p.id),
        essenTialPersonalityTags
      ) &&
      (choosePersonalityTags.length <= 0 ||
        arrOverlap(
          char.personalities.map((p) => p.id),
          choosePersonalityTags
        )) &&
      (!dungeon || char.dungeons.map((d) => d.id).includes(dungeon)) &&
      t(char.code).toLowerCase().includes(searchWord.toLowerCase())
  );

  const gridStyle: React.CSSProperties = isLargeScreen
    ? {
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gridTemplateRows: "repeat(3, minmax(270px, 1fr))",
        gridGap: "1rem",
        maxHeight: "810px",
      }
    : {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "minmax(0, 500px)",
        gridGap: "1rem",
      };

  return lastCheck === SearchCheckPageOptions.characters ? (
    <>
      <GlobalFilter type={SearchCheckPageOptions.characters} />
      <div style={gridStyle}>
        <CharacterDashboard {...{ allCharacters, filteredCharacters }} />
        <ManifestDashboard {...{ allCharacters, filteredCharacters }} />
        <GrastaDashboard {...{ allCharacters, filteredCharacters }} />
        <StaralignDashboard {...{ allCharacters, filteredCharacters }} />
      </div>
    </>
  ) : (
    <>
      <GlobalFilter type={SearchCheckPageOptions.buddies} />
      <Grid container spacing={1} sx={MainWrapperSx}>
        <BuddyDashboard />
      </Grid>
    </>
  );
}

export default CheckPage;
