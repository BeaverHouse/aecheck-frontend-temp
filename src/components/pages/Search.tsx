import Grid from "@mui/material/Grid2";
import useConfigStore from "../../store/useConfigStore";
import { SearchCheckPageOptions } from "../../constants/enum";
import CharacterSearch from "../organisms/search/CharacterSearch";
import BuddySearch from "../organisms/search/BuddySearch";
import { MainWrapperSx } from "../../constants/style";

function SearchPage() {
  const { lastSearch } = useConfigStore();

  return (
    <Grid
      container
      spacing={1}
      sx={MainWrapperSx}
    >
      {lastSearch === SearchCheckPageOptions.characters ? (
        <CharacterSearch />
      ) : (
        <BuddySearch />
      )}
    </Grid>
  );
}

export default SearchPage;