"use client";
import { useBeginnerAnswer } from "@/hooks/useBeginner";
import { useSession } from "@/hooks/useSession";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ANONYMOUS_USER } from "@/constants";
// import { getGeneratedCourses } from "@/services/services";
import { getCourseData } from "@/lib/api";

export default function Home() {
  const { handleCreateNewSession, sessionId, handleUserIdChange } =
    useSession();
  const [courses, setCourses] = useState<unknown>([]);

  useEffect(() => {
    (async () => {
      handleUserIdChange(ANONYMOUS_USER);
      await handleCreateNewSession(
        ANONYMOUS_USER,
        `/apps/beginner_agent/users/${ANONYMOUS_USER}/sessions`
      );
      const result: unknown = await getCourseData();
      setCourses(result);
    })();
  }, []);

  const {
    isAnswerReady,
    isGettingAnswer,
    answer,
    sendMessageAndWaitForAnswer,
  } = useBeginnerAnswer();

  const [textInput, setTextInput] = useState<string>("");
  const [links, setLinks] = useState<string[]>([""]);
  const [attachments, setAttachments] = useState<(File | null)[]>([null]);
  const courseOptions = [{ value: "physics", label: "Physics" }];

  const unitOptionsMap: Record<string, { value: string; label: string }[]> = {
    physics: [
      {
        value: "The kinetic model of matter",
        label: "The kinetic model of matter",
      },
      { value: "Properties of waves", label: "Properties of waves" },
      { value: "Static electricity", label: "Static electricity" },
    ],
  };

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  const unitOptions = selectedCourse ? unitOptionsMap[selectedCourse] : [];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prompt = `
    <role>I am an experienced teacher in the course of ${selectedCourse}.</role>
    <task>I want you to help me develop a study material unit: ${selectedUnit}</task>
    <instructions>
    <rules> ${textInput}</rules>
    ${
      links ??
      `<context> Use the following links in your search:${links.map(
        (link: string) => `- "${link}"`
      )}</context>`
    }`;

    try {
      await sendMessageAndWaitForAnswer(
        prompt,
        "beginner_agent",
        ANONYMOUS_USER,
        sessionId
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center md:w-96">
      <div className="text-center space-y-4 w-full">
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
              setSelectedUnit(""); // Reset unit selection if course changes
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
            Unit
          </label>
          <select
            id="unit-select"
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            disabled={!selectedCourse}
          >
            <option value="">
              {selectedCourse
                ? "Select a Unit"
                : "Please select a course first"}
            </option>
            {unitOptions.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-12">
          <form
            className="w-full mx-auto flex flex-col gap-4 bg-white p-6 rounded-lg shadow border border-gray-200"
            onSubmit={handleFormSubmit}
          >
            {/* Text Area */}
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your question or topic... (You can write multiple lines here)"
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-vertical min-h-[120px]"
              rows={4}
            />

            {/* Additional Inputs Row */}
            {/* Dynamic Links and Attachments */}
            <div className="flex flex-col gap-2 w-full">
              {/* Dynamic Links */}
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
                        {file ? file.name : "Attach File"}
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
                          setAttachments(
                            attachments.filter((_, i) => i !== idx)
                          )
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

            {/* Generate Button */}
            <button
              type="submit"
              className="border border-gray-300 bg-gray-100 px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition w-full sm:w-auto self-center flex items-center gap-2 justify-center"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
