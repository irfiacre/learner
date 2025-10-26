import React, { useState } from "react";
import BaseRadioButton from "../BaseRadioButton";

interface CreateCourseMaterialState {
  title: string;
  notes: string;
  fileMetadata: any;
  duration?: any;
}

const QuestionComponent = ({
  content,
  handleDeleteQuestion,
}: {
  content: any;
  handleDeleteQuestion: (id: string) => void;
}) => {
  const [state, setState] = useState<CreateCourseMaterialState>({
    title: "",
    notes: "",
    fileMetadata: null,
  });

  const handleDelete = () => {
    handleDeleteQuestion("xxx");
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="font-medium text-textLightColor pb-1">
          {content.question}
        </h1>
        <div>
          {content.options?.length > 0 ? (
            content.options.map((option: any) => (
              <div className="flex justify-start items-center" key={option}>
                <BaseRadioButton
                  value={option}
                  handleClicked={() => handleDelete()}
                />
                <span>{option}</span>
              </div>
            ))
          ) : (
            <div className="w-full border border-gray-300 rounded-md h-[10vh]"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
