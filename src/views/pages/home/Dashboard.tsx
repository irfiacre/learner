import React from "react";
import ExamDescriptionForm from "../../forms/ExamDescriptionForm";

const DashboardPage = () => {
  const handleFormSubmitted = () => {};

  return (
    <div className="flex flex-col gap-5">
      <div>
        <ExamDescriptionForm onFormSubmit={handleFormSubmitted} />
      </div>
    </div>
  );
};

export default DashboardPage;
