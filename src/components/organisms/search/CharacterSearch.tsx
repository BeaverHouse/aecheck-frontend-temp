import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import CharacterAvatar from "../../atoms/character/Avatar";
import useModalStore from "../../../store/useModalStore";
import {
  AEAlterStatus,
  AEAwakenStatus,
  AECategories,
  AECharacterStyles,
  AELightShadow,
  AEManifestLevels,
  ModalType,
  SearchCheckPageOptions,
} from "../../../constants/enum";
import { getShortName } from "../../../util/func";
import { useTranslation } from "react-i18next";
import GlobalFilter from "../../molecules/GlobalFilter";
import useFilterStore from "../../../store/useFilterStore";
import Loading from "../../atoms/Loading";
import { arrAllIncludes, arrOverlap } from "../../../util/arrayUtil";

function CharacterSearch() {
  const { t, i18n } = useTranslation();
  const { setModal } = useModalStore();
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

  const allCharacters = (data as APIResponse<CharacterSummary[]>).data.sort(
    (a, b) =>
      getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      )
  );
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 1,
        overflow: "auto",
      }}
    >
      <GlobalFilter type={SearchCheckPageOptions.characters} />
      <Grid container spacing={1} justifyContent="center">
        {filteredCharacters.map((info) => (
          <CharacterAvatar
            info={info}
            disableShadow={false}
            onClick={() => setModal(ModalType.character, info.id)}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default CharacterSearch;