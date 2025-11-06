import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function LogoIcon({ size, color }: { size?: number; color?: string }) {
  return (
    <div
      className="bg-primary p-2 rounded-md"
      style={{ backgroundColor: color }}
    >
      <Icon
        icon="ph:exam-fill"
        fontSize={size}
        className="text-white"
      />
    </div>
  );
}

export default LogoIcon;
