import React from "react";

const BaseCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string; // For tailwind additional styles
  onClick?: () => void;
}) => {
  return (
    <div
      className={`w-full bg-white border border-backgroundColor2 rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BaseCard;
