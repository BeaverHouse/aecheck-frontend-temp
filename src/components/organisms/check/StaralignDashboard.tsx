import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import {
  getInvenStatus,
  getNumber,
  getShortName,
  getStep,
} from "../../../util/func";
import { DashboardWrapperSx, FlexCenter, GridList } from "../../../constants/style";
import CharacterStaralign from "../../molecules/character/Staralign";
import StaralignFilterButton from "../../atoms/button/StaralignFilter";
import { VirtuosoGrid } from "react-virtuoso";
import InvenFilterButton from "../../atoms/button/InvenFilter";
import Box from "@mui/material/Box";

function StaralignDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { inven, staralign } = useCheckStore();
  const { invenStatusFilter, staralignStatusFilter } = useFilterStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.isAwaken)
    .filter(
      (char) =>
        staralignStatusFilter.includes(getStep(getNumber(char), staralign)) &&
        invenStatusFilter.includes(getInvenStatus(allCharacters, char, inven))
    )
    .sort((a, b) =>
      getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      )
    );

  return (
    <Container sx={DashboardWrapperSx}>
      <Box sx={{ ...FlexCenter, flexWrap: "wrap", mb: 2 }}>
        <StaralignFilterButton />
        <InvenFilterButton />
      </Box>
      <VirtuosoGrid
        style={{
          flexGrow: 1,
          width: "100%",
          height: 500,
        }}
        components={{
          List: GridList,
        }}
        data={targetCharacters}
        itemContent={(_, char) => (
          <CharacterStaralign key={`align-${char.id}`} {...char} />
        )}
      />
    </Container>
  );
}

export default StaralignDashboard;
