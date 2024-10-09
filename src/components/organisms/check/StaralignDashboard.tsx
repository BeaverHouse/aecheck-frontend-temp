import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getNumber, getShortName, getStep } from "../../../util/func";
import { FlexCenter, GridList } from "../../../constants/style";
import CharacterStaralign from "../../molecules/character/Staralign";
import StaralignFilterButton from "../../atoms/button/StaralignFilter";
import { VirtuosoGrid } from "react-virtuoso";

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
        height: "100%",
        padding: "2px",
      }}
    >
      <StaralignFilterButton />
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
