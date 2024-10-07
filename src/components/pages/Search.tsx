import Grid from "@mui/material/Grid2";
import useConfigStore from "../../store/useConfigStore";
import { CheckMenuOptions } from "../../constants/enum";
import CharacterSearch from "../organisms/search/CharacterSearch";
import BuddySearch from "../organisms/search/BuddySearch";
import { MainWrapperSx } from "../../constants/style";

function SearchPage() {
  const { lastSearchMenu } = useConfigStore();

  return (
    <Grid
      container
      spacing={1}
      sx={MainWrapperSx}
    >
      {lastSearchMenu === CheckMenuOptions.characters ? (
        <CharacterSearch />
      ) : (
        <BuddySearch />
      )}
    </Grid>
  );
}

export default SearchPage;
