import React from "react";
import { Icon } from "@iconify/react";
import { primaryColor } from "@/constants/colors";
import { Poppins } from "next/font/google";
import LogoIcon from "./LogoIcon";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
});

const LogoComponent = ({
  small,
  medium,
}: {
  small?: boolean;
  medium?: boolean;
}) => {
  const logoParams = {
    iconSize: small ? 50 : medium ? 80 : 110,
    fontSize1: small ? 22 : medium ? 32 : 48,
    fontSize2: small ? 34 : medium ? 48 : 88,
  };
  return (
    <div className="text-center flex justify-center items-center gap-2 text-white">
      <div>
        <h1 style={{ fontSize: logoParams.fontSize1 }}>Toefl</h1>
        <h1 style={{ fontSize: logoParams.fontSize2, fontWeight:"bold" }}>Practice</h1>
      </div>
    </div>
  );
};

export default LogoComponent;
