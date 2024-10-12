import Container from "@mui/material/Container";
import InvenFilterButton from "../../atoms/button/InvenFilter";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getNumber, getInvenStatus, getShortName } from "../../../util/func";
import {
  AECharacterStyles,
  ModalType,
  PopupOnCheckOptions,
} from "../../../constants/enum";
import CharacterAvatar from "../../atoms/character/Avatar";
import {
  DashboardWrapperSx,
  FlexCenter,
  GridList,
} from "../../../constants/style";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { VirtuosoGrid } from "react-virtuoso";
import PopupConfigButton from "../../atoms/button/PopupConfig";
import Typography from "@mui/material/Typography";
import useModalStore from "../../../store/useModalStore";
import useConfigStore from "../../../store/useConfigStore";

function CharacterDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { invenStatusFilter } = useFilterStore();
  const { inven, buddy, setInven, setBuddy } = useCheckStore();
  const { popupOnCheck } = useConfigStore();
  const { setModal } = useModalStore();

  const targetCharacters = filteredCharacters
    .filter(
      (char) =>
        getNumber(char) < 1000 &&
        invenStatusFilter.includes(getInvenStatus(allCharacters, char, inven))
    )
    .sort((a, b) =>
      getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      )
    );

  /**
   * 1. Add character
   * 2. Add required 4-star character (if exist)
   * 3. Add buddy
   */
  const addSingleInven = (char: CharacterSummary) => {
    const newCharIds = [...inven, getNumber(char)];

    const fourStarChar = allCharacters.find(
      (c) => c.code === char.code && c.style === AECharacterStyles.four
    );
    if (fourStarChar && char.style === AECharacterStyles.normal) {
      newCharIds.push(getNumber(fourStarChar));
    }

    setInven(newCharIds);

    if (char.buddy) {
      const newBuddyIds = [...buddy, getNumber(char.buddy)];
      setBuddy(newBuddyIds);
    }

    if (
      popupOnCheck === PopupOnCheckOptions.all ||
      (popupOnCheck === PopupOnCheckOptions.fourOnly &&
        char.style === AECharacterStyles.four)
    ) {
      setModal(ModalType.character, char.id);
    }
  };

  /**
   * 1. Remove character
   * 2. Remove normal style if removed character is 4-star
   * 3. Remove buddy
   */
  const removeSingleInven = (char: CharacterSummary) => {
    console.log("remove", char.id);
    const removeCharIds = [getNumber(char)];
    const NSChar = allCharacters.find(
      (c) => c.code === char.code && c.style === AECharacterStyles.normal
    );
    if (NSChar && char.style === AECharacterStyles.four) {
      removeCharIds.push(getNumber(NSChar));
    }
    setInven(inven.filter((i) => !removeCharIds.includes(i)));
    if (char.buddy) {
      setBuddy(buddy.filter((b) => b !== getNumber(char.buddy!)));
    }
  };

  const checkAll = () => {
    const newInven = [
      ...inven,
      ...targetCharacters.map((char) => getNumber(char)),
    ];

    const newCodes = targetCharacters.map((char) => char.code);

    const fourStars = allCharacters.filter(
      (char) =>
        char.style === AECharacterStyles.four && newCodes.includes(char.code)
    );
    for (const char of fourStars) {
      newInven.push(getNumber(char));
    }
    setInven(newInven);

    const newBuddy = [
      ...buddy,
      ...targetCharacters
        .filter((char) => char.buddy)
        .map((char) => getNumber(char.buddy!)),
    ];
    setBuddy(newBuddy);
  };

  const uncheckAll = () => {
    const removeInven = [...targetCharacters.map((char) => getNumber(char))];

    const newCodes = targetCharacters.map((char) => char.code);

    const normalStyles = allCharacters.filter(
      (char) =>
        char.style === AECharacterStyles.normal && newCodes.includes(char.code)
    );
    for (const char of normalStyles) {
      removeInven.push(getNumber(char));
    }
    setInven(inven.filter((i) => !removeInven.includes(i)));

    const removeBuddy = [
      ...targetCharacters
        .filter((char) => char.buddy)
        .map((char) => getNumber(char.buddy!)),
    ];
    setBuddy(buddy.filter((b) => !removeBuddy.includes(b)));
  };

  const toggleSingleInven = (char: CharacterSummary) => {
    const id = getNumber(char);
    if (inven.includes(id)) {
      removeSingleInven(char);
    } else {
      addSingleInven(char);
    }
  };

  return (
    <Container sx={DashboardWrapperSx}>
      <Box sx={{ ...FlexCenter, flexWrap: "wrap", mb: 1 }}>
        <Typography variant="subtitle1">
          {t("frontend.message.popup-on-check")}
        </Typography>
        <PopupConfigButton />
      </Box>
      <Box sx={{ ...FlexCenter, flexWrap: "wrap", mb: 2 }}>
        <InvenFilterButton />
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
          <CharacterAvatar
            key={`char-${char.id}`}
            info={char}
            disableShadow={false}
            onClick={() => toggleSingleInven(char)}
          />
        )}
      />
    </Container>
  );
}

export default CharacterDashboard;
