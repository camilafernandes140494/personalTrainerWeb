import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px", // Ajuste o valor de acordo com o arredondamento desejado
  backgroundColor: "#78A55A",
  color: "white",
  "&:hover": {
    backgroundColor: "#678E49", // Cor de hover opcional
  },
}));

const CustomButtonWithLabel = ({ label, ...rest }) => {
  return <CustomButton {...rest}>{label}</CustomButton>;
};

export default CustomButtonWithLabel;
