import React, { useState } from "react";
import BaseRadioButton from "../BaseRadioButton";
import { Icon } from "@iconify/react/dist/iconify.js";

interface CreateCourseMaterialState {
  title: string;
  notes: string;
  fileMetadata: any;
  duration?: any;
}

const QuestionComponent = ({
  content,
  handleDeleteQuestion,
  loading,
  hasDelete,
}: {
  content: any;
  handleDeleteQuestion: (id: string) => void;
  loading?: boolean;
  hasDelete?: boolean;
}) => {
  const [state, setState] = useState<CreateCourseMaterialState>({
    title: "",
    notes: "",
    fileMetadata: null,
  });

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-row gap-5 items-center">
          {hasDelete && (
            <button
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none disabled:text-textLightColor"
              type="button"
              onClick={() => handleDeleteQuestion(content)}
              disabled={loading}
            >
              <Icon icon="mdi:delete" fontSize={20} />
            </button>
          )}
          <h1 className="font-medium text-textLightColor pb-1">
            {content.question}
          </h1>
        </div>

        <div className="px-10">
          {content.options?.length > 0 ? (
            content.options.map((option: any) => (
              <div className="flex justify-start items-center" key={option}>
                <BaseRadioButton value={option} />
                <span>{option}</span>
              </div>
            ))
          ) : (
            <div className="w-full border border-gray-300 rounded-md h-[10vh]"></div>
          )}
        </div>
        <h1 className="font-medium text-primary pb-1 px-10">
          Correct Answer: {content.answer}
        </h1>
      </div>
    </div>
  );
};

export default QuestionComponent;
