import { AECharacterStyles, InvenStatus, ManifestStatus } from "../constants/enum";

export const getShortName = (name: string, lang: string) => {
  const arr = name.split(" ");
  switch (lang) {
    case "jp":
      return arr[0];
    case "ko":
      return name.includes("(") ? arr[0] : arr[arr.length - 1];
    case "en":
      return name.includes("(") ? arr[0] : name;
    default:
      return name;
  }
};
export const getNumber = (info: CharacterSummary | CharacterDetail | BuddyDetail) => {
  return Number(info.id.replace(/[^\d-]/g, ''));
};

export const getStep = (id: number, arr: Array<number>) => {
  const stepList = arr.filter((x) => x % 10000 === id);
  return stepList.length > 0 ? Math.floor(stepList[0] / 10000) : 0;
};

/**
 * Get inventory state for character
 *
 * 1. If it is included in player's inventory, return `InvenStatus.owned`
 * 2-1. If AC class change is possible, return `InvenStatus.ccRequired`
 * 2-2. If other class change is possible, return `InvenStatus.ccRequired`
 * 3. Otherwise, return `InvenStatus.notOwned`
 *
 * @param {Array<CharacterSummary>} relatedCharacters Information of related characters.
 * @param {CharacterSummary} character Information of specific character.
 * @param {Array<number>} inven The player's inventory data.
 * @return {InvenStatus} A state of specified character.
 */
export const getInvenStatus = (
  relatedCharacters: Array<CharacterSummary>,
  character: CharacterSummary,
  inven: Array<number>
): InvenStatus => {
  const id = getNumber(character);
  if (inven.includes(id)) return InvenStatus.owned;
  const related = relatedCharacters.filter(
    (c) => c.code === character.code || c.alterCharacter === character.code
  )
  if (related.filter((c) => inven.includes(getNumber(c))).length > 0) {
    return InvenStatus.ccRequired;
  } else {
    return InvenStatus.notOwned;
  }
};

/**
 * Get manifest state for character
 *
 * 1. If it is not owned, return `ManifestStatus.notOwned`
 * 2. If it is owned, return completed state based on current step
 * 3. If class change is possible:
 *
 *    - If its style is not NS, class change is required
 *    - Otherwise, manifest may be possible if player has 4-star character and other style.
 * 
 * @param {Array<CharacterSummary>} relatedCharacters Information of related characters.
 * @param {CharacterSummary} character Information of specific character.
 * @param {Array<number>} inven The player's inventory data.
 * @param {Array<number>} manifest The player's manifest data.
 * @return {ManifestStatus} A state of specified character.
 */
export const getManifestStatus = (
  relatedCharacters: Array<CharacterSummary>,
  character: CharacterSummary,
  inven: Array<number>,
  manifest: Array<number>
): ManifestStatus => {
  const id = getNumber(character);
  const step = getStep(id, manifest);
  const invenState = getInvenStatus(relatedCharacters, character, inven);
  if (invenState === InvenStatus.notOwned) return ManifestStatus.notOwned;
  else if (invenState === InvenStatus.owned) {
    return step === character.maxManifest ? ManifestStatus.completed : ManifestStatus.incompleted;
  } else {
    if (character.style !== AECharacterStyles.normal) return ManifestStatus.ccRequired;
    else {
      const sameCodes = relatedCharacters
        .filter((c) => c.code === character.code && inven.includes(getNumber(c)))
        .map((c) => c.style);

      if (sameCodes.includes(AECharacterStyles.four) && sameCodes.length > 1) return ManifestStatus.incompleted;
      else return ManifestStatus.ccRequired;
    }
  }
}