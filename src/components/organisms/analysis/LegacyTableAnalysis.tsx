import React from "react";
import { useTranslation } from "react-i18next";
import { arrAllIncludes } from "../../../util/arrayUtil";
import Box from "@mui/material/Box/Box";
import { getShortName } from "../../../util/func";
import { AEData } from "../../../constants";
import { AECharacterStyles, ModalType } from "../../../constants/enum";
import CharacterAvatar from "../../atoms/character/Avatar";
import useModalStore from "../../../store/useModalStore";
import DownloadButton from "../../atoms/button/Download";

const LegacyTableAnalysis: React.FC<AnalysisProps> = ({ allCharacters }) => {
  const { t, i18n } = useTranslation();
  const { setModal } = useModalStore();
  const baseCharacters = allCharacters.sort((a, b) =>
    getShortName(t(a.code), i18n.language).localeCompare(
      getShortName(t(b.code), i18n.language)
    )
  );

  return (
    <>
      {" "}
      <DownloadButton tag="ae-table" />
      <div
        style={{
          maxWidth: "90%",
          maxHeight: "80vh",
          margin: "10px auto",
          overflow: "scroll",
        }}
      >
        <table
          style={{
            backgroundColor: "white",
            whiteSpace: "normal",
            textAlign: "center",
          }}
          id="ae-table"
        >
          <thead>
            <tr>
              <th style={{ width: 70 }}></th>
              {AEData.elementTags.map((element, idx) => (
                <th key={idx} style={{ minWidth: 280 }}>
                  <img
                    style={{ width: 30 }}
                    src={`${import.meta.env.VITE_CDN_URL}/icon/${element}.png`}
                    alt={element}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AEData.weaponTags.map((weapon, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    style={{ width: 30 }}
                    src={`${import.meta.env.VITE_CDN_URL}/icon/${weapon}.png`}
                    alt={weapon}
                  />
                </td>
                {AEData.elementTags.map((element, idx2) => (
                  <td
                    key={idx2}
                    className={(idx + idx2) % 2 === 1 ? "odd" : "even"}
                    style={{
                      padding: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "99%",
                        display: "grid",
                        justifyContent: "center",
                        gridTemplateColumns: "repeat(auto-fill, 75px)",
                        columnGap: 1.5,
                        rowGap: 1.5,
                      }}
                    >
                      {baseCharacters
                        .filter(
                          (c) =>
                            arrAllIncludes(
                              c.personalities.map((p) => p.id),
                              [weapon, element]
                            ) && c.style !== AECharacterStyles.four
                        )
                        .map((info) => (
                          <CharacterAvatar
                            info={info}
                            disableShadow={false}
                            disableGray={false}
                            onClick={() =>
                              setModal(ModalType.character, info.id)
                            }
                          />
                        ))}
                    </Box>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LegacyTableAnalysis;
