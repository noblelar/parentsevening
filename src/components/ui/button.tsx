import React from "react";
import { ButtonProps } from "@/utils/data_interface";


const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white hover:bg-white/90 text-primary_dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  );
};

export default Button;
