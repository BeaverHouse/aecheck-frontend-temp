import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import InvenFilterButton from "../../atoms/button/InvenFilter";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import {
  getNumber,
  getInvenStatus,
  getShortName,
} from "../../../util/func";
import { AECharacterStyles } from "../../../constants/enum";
import CharacterAvatar from "../../atoms/character/Avatar";
import { FlexCenter } from "../../../constants/style";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

function CharacterDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const { invenStatusFilter } = useFilterStore();
  const { inven, buddy, setInven, setBuddy } = useCheckStore();

  const targetCharacters = filteredCharacters
    .filter((char) =>
      invenStatusFilter.includes(getInvenStatus(allCharacters, char, inven))
    )
    .filter((char) => getNumber(char) < 1000)
    .sort((a, b) =>
      getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      )
    );

  const toggleSingleInven = (char: CharacterSummary) => {
    const id = getNumber(char);
    if (inven.includes(id)) {
      setInven(inven.filter((i) => i !== id));
    } else {
      const fourStarChar = allCharacters.find(
        (c) => c.code === char.code && c.style === AECharacterStyles.four
      );
      if (fourStarChar && char.style === AECharacterStyles.normal) {
        const fourStarId = getNumber(fourStarChar);
        setInven([...inven, id, fourStarId]);
      } else {
        setInven([...inven, id]);
      }
    }
    if (char.buddy) {
      const buddyId = getNumber(char.buddy);
      const newBuddies = buddy.includes(buddyId) ? buddy.filter((b) => b !== buddyId) : [...buddy, buddyId];
      setBuddy(newBuddies);
    }
  };

  return (
    <Container
      sx={{
        ...FlexCenter,
        flexDirection: "column",
        border: "gray 1px solid",
        height: "100%",
        padding: "2px",
        gridRow: isLargeScreen ? "span 3" : "span 1",
      }}
    >
      <Typography variant="h6" component="div">
        {t("frontend.word.character")}
      </Typography>
      <InvenFilterButton />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "100%",
          overflow: "auto",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {targetCharacters.map((char) => (
            <CharacterAvatar
              key={`char-${char.id}`}
              info={char}
              disableShadow={false}
              onClick={() => toggleSingleInven(char)}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default CharacterDashboard;
