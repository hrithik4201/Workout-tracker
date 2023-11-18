import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box mt="75px">
    <Typography
      variant="h5"
      sx={{ fontSize: { lg: "28px", xs: "20px" } }}
      mt="15px"
      textAlign="center"
      pb="15px"
    >
      Made by Hrithik Kumar
    </Typography>
  </Box>
);

export default Footer;
