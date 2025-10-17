import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function LogoIcon({ size, color }: { size?: number; color?: string }) {
  return (
    <div
      className="bg-primary p-2 rounded-md"
      style={{ background_color: color }}
    >
      <Icon
        icon="healthicons:truck-driver"
        fontSize={size}
        className="text-white"
      />
    </div>
  );
}

export default LogoIcon;
