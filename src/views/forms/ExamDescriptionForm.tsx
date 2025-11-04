"use client";
import React, { useState } from "react";
import BaseButton from "@/src/components/buttons/BaseButton";
import { handleGetAgentOutput } from "@/agents/assessment";
import { buildAssessmentPrompt } from "@/agents/prompts";
import { createDocEntry } from "@/services/firebase/helpers";
import { parseAttachments } from "@/actions/actions";
import BaseInput from "@/src/components/inputs/BaseInput";
import { useRouter } from "next/navigation";

interface ExamDescriptionState {
  title: string;
  description: string;
}

const ExamDescriptionForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (obj: ExamDescriptionState) => void;
}) => {
  const [textInput, setTextInput] = useState<string>("");
  const [links, setLinks] = useState<string[]>([""]);
  const [attachments, setAttachments] = useState<(File | null)[]>([null]);
  const courseOptions = [{ value: "physics", label: "Physics" }];
  const [training, setTrainingData] = useState<string>("");
  const [error, setError] = useState<{ error: boolean; text: string }>({
    error: false,
    text: "",
  });
  const [generating, setGenerating] = useState<boolean>(false);

  const unitOptions = [
    { label: "Open Questions Only", value: "open" },
    { label: "Multiple Choice Questions Only", value: "multiplechoice" },
    { label: "Mix of Multiple Choice and Open Questions", value: "mixture" },
  ];
  const router = useRouter();

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedExamType, setSelectedUnit] = useState<string>("");

  const handleParseFiles = async () => {
    const filesToParse = attachments.filter(
      (file: any) => file !== null
    ) as File[];

    if (filesToParse.length === 0) {
      setError({
        text: "Please select at least one file.",
        error: true,
      });
      return;
    }

    const formData = new FormData();
    for (const file of filesToParse) {
      formData.append("attachments", file);
    }

    try {
      const extractedText = await parseAttachments(formData);
      setTrainingData((prev: string) => prev + extractedText);
      setError({
        text: "Please select at least one file.",
        error: false,
      });

      setAttachments([null]);
    } catch (error) {
      console.error("Error parsing files:", error);
      setError({
        text: (error as Error).message,
        error: true,
      });
    } finally {
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerating(true);
    await handleParseFiles();
    console.info("===== Done Parsing Training Data ======");

    const examObject = {
      course: selectedCourse,
      examType: unitOptions.filter((elt) => elt.value === selectedExamType)[0]
        .label,
      note: textInput,
      links,
      baseInformation: training,
    };

    const examPrompt = buildAssessmentPrompt(examObject);
    const result = await handleGetAgentOutput(examPrompt, textInput);
    await createDocEntry("exams", {
      id: crypto.randomUUID(),
      ...result,
      ...examObject,
      createdAt: new Date(),
      examPrompt,
    });
    setGenerating(false);
    router.push("/exams");
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-start w-full">
        <label
          htmlFor="course-name-select"
          className="mb-1 text-gray-700 font-semibold"
        >
          Course Name
        </label>
        <select
          id="course-name-select"
          className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedUnit("");
          }}
        >
          <option value="">Select a Course</option>
          {courseOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-start w-full">
        <label
          htmlFor="unit-select"
          className="mb-1 text-gray-700 font-semibold"
        >
          Exam Type
        </label>
        <select
          id="unit-select"
          className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          value={selectedExamType}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="">{"Select Exam Type"}</option>
          {unitOptions.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* <BaseInput label="Number Of Questions" required={true} type="number" onChange={}/> */}
      </div>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Add context or notes for how the quiz is structured..."
        className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-vertical min-h-[120px]"
        rows={4}
      />
      <div className="flex flex-col gap-2 w-full">
        {links.map((link, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="url"
              value={link}
              placeholder={`Paste link ${
                links.length > 1 ? `#${idx + 1}` : "(optional)"
              }`}
              className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[idx] = e.target.value;
                setLinks(newLinks);
              }}
            />
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  setLinks(links.filter((_, i) => i !== idx));
                }}
                className="p-1 text-red-500 hover:bg-gray-200 rounded"
                title="Remove link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {idx === links.length - 1 && (
              <button
                type="button"
                onClick={() => setLinks([...links, ""])}
                className="p-1 text-primary hover:bg-gray-200 rounded"
                title="Add another link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {/* Dynamic Attachments */}
        <div className="flex flex-wrap gap-2 items-center">
          {attachments.map((file, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <label
                className="flex items-center justify-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-accent/10 transition whitespace-nowrap min-w-[120px]"
                title={!file ? "Attach file" : file.name}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l7.07-7.07a4 4 0 00-5.657-5.657l-8.486 8.485a6 6 0 108.485 8.486l6.364-6.364"
                  />
                </svg>
                <span className="text-xs">
                  {file ? file.name : "Attach File (Optional)"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const newAttachments = [...attachments];
                      newAttachments[idx] = files[0];
                      setAttachments(newAttachments);
                    }
                  }}
                />
              </label>
              {attachments.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setAttachments(attachments.filter((_, i) => i !== idx))
                  }
                  className="p-1 text-red-500 hover:bg-gray-200 rounded"
                  title="Remove attached file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {idx === attachments.length - 1 && (
                <button
                  type="button"
                  onClick={() => setAttachments([...attachments, null])}
                  className="p-1 text-primary hover:bg-gray-200 rounded"
                  title="Add another file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <BaseButton loading={generating}>Generate</BaseButton>
    </form>
  );
};

export default ExamDescriptionForm;
