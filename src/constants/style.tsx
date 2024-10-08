import React from "react";
import { GridComponents } from "react-virtuoso";

export const FlexCenter: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const MainWrapperSx: React.CSSProperties = {
  width: "98%",
  maxWidth: 1600,
  margin: "10px auto",
  textAlign: "center",
};

export const GridList: GridComponents["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...FlexCenter,
          flexWrap: "wrap",
          gap: "10px",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
