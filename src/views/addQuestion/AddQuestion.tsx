import { handleGetAgentOutput } from "@/agents/assessment";
import { buildQuestionPrompt } from "@/agents/prompts";
import BaseButton from "@/src/components/buttons/BaseButton";
import React, { useState } from "react";

const AIInput = ({
  handleSubmit,
  loading,
}: {
  handleSubmit: (text: string) => void;
  loading: boolean;
}) => {
  const [text, setText] = useState<string>("");
  return (
    <div className="flex flex-row items-center gap-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the question ..."
        className="w-[80%] bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-vertical min-h-[70px]"
        rows={3}
      />
      <BaseButton
        handleSubmit={() => handleSubmit(text)}
        className="rounded-full px-10 py-2 bg-primary/90 hover:bg-primary text-white"
        loading={loading}
      >
        Send
      </BaseButton>
    </div>
  );
};

const AddQuestion = ({
  exam,
  loading,
  handleAddMoreQuestions,
}: {
  exam: any;
  loading: boolean;
  handleAddMoreQuestions: (data: any) => void;
}) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [addingQuestions, setAddingQuestions] = useState(false);

  const handleAskAI = async (text: string) => {
    setAddingQuestions(true);
    const questionPrompt = buildQuestionPrompt(exam.examPrompt, exam.result);
    const result: any = await handleGetAgentOutput(questionPrompt, text);
    await handleAddMoreQuestions(result);
    setAddingQuestions(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-xl text-center py-5 text-gray-500">
          Add another question
        </h1>
        {showInput ? (
          <AIInput
            handleSubmit={handleAskAI}
            loading={addingQuestions || loading}
          />
        ) : (
          <BaseButton
            handleSubmit={() => setShowInput(true)}
            className="rounded-full px-10 py-2 bg-primary/90 hover:bg-primary text-white"
          >
            Ask AI
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
