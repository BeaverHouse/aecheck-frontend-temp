import useConfigStore from "../../store/useConfigStore";
import { AnalysisPageOptions } from "../../constants/enum";
import { MainWrapperSx } from "../../constants/style";
import StardreamAnalysis from "../organisms/analysis/StardreamAnalysis";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import WhiteKeyAnalysis from "../organisms/analysis/WhiteKeyAnalysis";
import LegacyAnalysis from "../organisms/analysis/LegacyAnalysis";
import LegacyTableAnalysis from "../organisms/analysis/LegacyTableAnalysis";
import Loading from "../atoms/Loading";

function AnalysisPage() {
  const { lastAnalysis } = useConfigStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["getCharacters"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/character`).then((res) =>
        res.json()
      ),
  });
  
  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;

  const allCharacters = (data as APIResponse<CharacterSummary[]>).data;

  const component = () => {
    switch (lastAnalysis) {
      case AnalysisPageOptions.stardream:
        return <StardreamAnalysis allCharacters={allCharacters} />;
      case AnalysisPageOptions.whitekey:
        return <WhiteKeyAnalysis allCharacters={allCharacters} />;
      case AnalysisPageOptions.legacy:
        return <LegacyAnalysis allCharacters={allCharacters} />;
      case AnalysisPageOptions.legacyTable:
        return <LegacyTableAnalysis allCharacters={allCharacters} />;
    }
  }

  return (
    <Box
      sx={MainWrapperSx}
    >
      {component()}
    </Box>
  );
}

export default AnalysisPage;