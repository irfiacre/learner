import React from "react";
import { PulseLoader } from "react-spinners";

const BaseButton = ({
  handleSubmit,
  loading,
  children,
}: {
  children: React.ReactNode;
  handleSubmit?: (e: any) => void;
  loading?: boolean;
}) => {
  return (
    <div className="p-3.5">
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full text-white bg-primary hover:bg-primary/80 focus:outline-none font-medium rounded-md text-md text-center p-5 disabled:bg-borderColorLight"
        disabled={loading}
      >
        {loading ? (
          <PulseLoader
            color={"#ffffff"}
            loading={loading}
            size={10}
            cssOverride={{ width: "100%" }}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={0.5}
          />
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default BaseButton;
