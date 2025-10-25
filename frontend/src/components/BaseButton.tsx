import React from "react";

const BaseButton = ({
  handleSubmit,
  loading,
  children
}: {
  handleSubmit: (e: any) => void;
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <div className="p-3.5">
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full text-white bg-primary hover:bg-primaryDark focus:outline-none font-medium rounded-md text-md text-center px-5 py-2 disabled:bg-borderColorLight"
        disabled={loading}
      >
        {loading ? "..." : children}
      </button>
    </div>
  );
};

export default BaseButton;
