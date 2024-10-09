import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getNumber, getShortName, getStep } from "../../../util/func";
import { FlexCenter, GridList } from "../../../constants/style";
import CharacterGrasta from "../../molecules/character/Grasta";
import GrastaFilterButton from "../../atoms/button/GrastaFilter";
import { VirtuosoGrid } from "react-virtuoso";

function GrastaDashboard({ filteredCharacters }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { grasta } = useCheckStore();
  const { grastaStatusFilter } = useFilterStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.dungeons.length > 0)
    .filter((char) =>
      grastaStatusFilter.includes(getStep(getNumber(char), grasta))
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
      <GrastaFilterButton />
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
          <CharacterGrasta key={`grasta-${char.id}`} {...char} />
        )}
      />
    </Container>
  );
}

export default GrastaDashboard;
