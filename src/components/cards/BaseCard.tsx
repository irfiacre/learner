import React from "react";

const BaseCard = ({
  children,
  className,
}: {
  children: any;
  className?: string; // For tailwind additional styles
}) => {
  return (
    <div
      className={`bg-white border border-backgroundColor2 rounded-lg h-[89vh] overflow-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default BaseCard;
