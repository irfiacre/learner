import React from "react";

const BaseRadioButton = ({
  value,
  handleClicked,
}: {
  value: string;
  handleClicked?: (e: any) => void;
}) => {
  return (
    <div className="p-3.5">
      <input
        id="default-radio-1"
        type="radio"
        value={value}
        //@ts-ignore
        onClick={(e) => handleClicked(e.target.value)}
        name="default-radio"
        className="text-primary bg-primary hover:bg-primary/90 focus:outline-none  font-medium rounded-md text-md text-center py-3 disabled:bg-border_light"
      />
    </div>
  );
};

export default BaseRadioButton;
