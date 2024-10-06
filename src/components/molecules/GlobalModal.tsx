import React from "react";
import CharacterModal from "../atoms/character/Modal";
import useModalStore from "../../store/useModalStore";
import { ModalType } from "../../constants/enum";
import DataLoaderModal from "../atoms/DataLoaderModal";
import FilterModal from "../atoms/FilterModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface GlobalModalProps {
  type: ModalType | undefined;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ type }) => {
  const { hideModal } = useModalStore();

  const popModal = (e: PopStateEvent) => {
    e.preventDefault();
    if (type) {
      hideModal();
      window.history.go(1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("popstate", popModal);
    return () => window.removeEventListener("popstate", popModal);
  });

  if (!type) {
    return null;
  } else {
    switch (type) {
      case ModalType.character:
        return <CharacterModal />;
      case ModalType.dataLoader:
        return <DataLoaderModal />;
      case ModalType.filter:
        return <FilterModal />;
      case ModalType.loading:
        return (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        );
      default:
        return null;
    }
  }
};

export default GlobalModal;
