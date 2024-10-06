import React from "react";
import html2canvas from "html2canvas";
import DownloadIcon from "@mui/icons-material/Download";
import useTheme from "@mui/material/styles/useTheme";
import useModalStore from "../../../store/useModalStore";
import Fab from "@mui/material/Fab";
import { ModalType } from "../../../constants/enum";

interface DownloadProps {
  tag: string;
}

/**
 * Downloader
 *
 * 특정 태그가 달린 div 영역을 이미지로 다운로드할 수 있게 합니다.
 * 일부 기기에서 동작하지 않을 수도 있습니다.
 *
 * @param tag
 */
const DownloadButton: React.FC<DownloadProps> = ({ tag }) => {
  const theme = useTheme();
  const { setModal, hideModal } = useModalStore();

  const handleSaveClick = async () => {
    const element = document.getElementById(tag);
    if (!element) return;
    setModal(ModalType.loading);
    try {
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        windowWidth: tag === "ae-wrapper" ? 1200 : element.clientWidth,
        backgroundColor: theme.palette.background.paper,
        ignoreElements: (element) => element.id === "downloader",
      });

      const body = {
        file: canvas.toDataURL("image/jpeg"),
      };

      const uploadURL = `https://api.haulrest.me/file/aecheck`;
      const res = await fetch(uploadURL, {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      const url = ((await res.json()) as APIResponse<string>).data;
      let link = document.createElement("a");

      document.body.appendChild(link);

      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    } finally {
      hideModal();
    }
  };

  return (
    <Fab
      aria-label="Download Button"
      id="downloader"
      color="secondary"
      onClick={handleSaveClick}
      size="small"
      sx={{ m: 0.5, mr: 1, ml: 2, minWidth: 40, minHeight: 40 }}
    >
      <DownloadIcon />
    </Fab>
  );
};

export default DownloadButton;
