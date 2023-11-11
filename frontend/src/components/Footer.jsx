import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo-1.png";

const Footer = () => (
  <Box mt="75px">
    {/* <Stack
      gap='40px'
      sx={{ alignItems: 'center' }}
      flexWrap='wrap'
      px='40px'
      pt='24px'
    >
      <img src={Logo} alt='logo' style={{ width: '165px', height: '56px' }} />
    </Stack> */}
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
