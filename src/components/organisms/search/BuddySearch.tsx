import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import BuddyCard from "../../atoms/BuddyCard";
import useFilterStore from "../../../store/useFilterStore";
import GlobalFilter from "../../molecules/GlobalFilter";
import { CheckMenuOptions } from "../../../constants/enum";
import Loading from "../../atoms/Loading";

function BuddySearch() {
  const { t } = useTranslation();
  const { searchWord } = useFilterStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["getBuddies"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/buddy`).then((res) => res.json()),
  });

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  const allBuddies = (data as APIResponse<BuddyDetail[]>).data.sort((a, b) =>
    t(a.id).localeCompare(t(b.id))
  );

  const filteredBuddies = allBuddies.filter((b) =>
    t(b.id).toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, pt: 1.5 }}>
      <GlobalFilter type={CheckMenuOptions.buddies} />
      <Grid container spacing={1} justifyContent="center">
        {filteredBuddies.map((info) => (
          <BuddyCard key={info.id} info={info} onClick={() => {}} />
        ))}
      </Grid>
    </Box>
  );
}

export default BuddySearch;
