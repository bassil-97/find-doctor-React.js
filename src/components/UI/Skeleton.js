import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations({ width }) {
  return (
    <Box sx={{ width: width ? `${width}%` : 300 }}>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
