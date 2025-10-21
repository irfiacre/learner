import React,{ useState } from "react";


type TopicVideo = { title: string; url: string };
type TopicData = {
  title: string;
  content: string[];
  activities: string[];
  assessment: string[];
  videos: TopicVideo[];
};

function formatContent(content: string[]) {
  return (
    <div>
      {content.map((item, idx) => {
        // Markdown-like formatting: bold, code, lists
        if (item.startsWith("**") && item.endsWith("**:")) {
          // Section headings in content
          return (
            <h4 key={idx} style={{ marginTop: 16, fontWeight: 600 }}>
              {item.replace(/\*\*/g, "").replace(":", "")}
            </h4>
          );
        }
        if (item.trim().startsWith("*") || item.trim().startsWith("-")) {
          // List
          return (
            <li key={idx} style={{ marginLeft: 24 }}>
              {item
                .replace(/^(\s*[-*]+\s*)/, "")
                .replace(/\*\*(.*?)\*\*/g, (m, c) => <b>{c}</b>)
                .replace(/`([^`]+)`/g, (m, c) => <code>{c}</code>)}
            </li>
          );
        }
        // Regular paragraph
        let contentHTML = item
          .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
          .replace(/`([^`]+)`/g, "<code>$1</code>");
        return (
          <p
            key={idx}
            style={{
              marginTop: 8,
              marginBottom: 4,
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />
        );
      })}
    </div>
  );
}

const ProjectileMotionTopics = ({
  projectileMotionData,
}: { projectileMotionData: TopicData[] }) => {
  // Use state to track which topics are open (using topic index for uniqueness)
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (idx: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div>
      <div className="space-y-4">
        {projectileMotionData.map((topic, idx) => {
          const isOpen = !!openTopics[idx];

          return (
            <div
              key={topic.title}
              className="border border-gray-300 rounded-md"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleTopic(idx)}
                aria-expanded={isOpen}
                aria-controls={`topic-content-${idx}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className="text-lg font-semibold">
                  {topic.title}
                </span>
                <span className="ml-4">
                  {isOpen ? (
                    <svg width={16} height={16} viewBox="0 0 20 20"><path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                  ) : (
                    <svg width={16} height={16} viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                  )}
                </span>
              </button>
              {isOpen && (
                <div
                  id={`topic-content-${idx}`}
                  className="px-6 pb-4"
                >
                  <div className="mb-4">
                    {formatContent(topic.content)}
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold">Activities:</h4>
                    <ul className="list-disc ml-6">
                      {topic.activities.map((act, ai) => (
                        <li key={ai}>{act}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold">Assessment:</h4>
                    <ul className="list-disc ml-6">
                      {topic.assessment.map((as, asi) => (
                        <li key={asi}>{as}</li>
                      ))}
                    </ul>
                  </div>
                  {topic.videos.length > 0 && (
                    <div className="mb-1">
                      <h4 className="font-semibold">Videos:</h4>
                      <ul className="list-disc ml-6">
                        {topic.videos.map((vid, vi) => (
                          <li key={vi}>
                            <a
                              href={vid.url}
                              className="text-blue-500 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {vid.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProjectileMotionTopics };




const UnitComponent = ({ content }: { content: object }) => {
  console.log("-----", content);

  return (
    <div>
      <h3 className="text-xl font-bold text-primary mb-4">{content.title}</h3>
      <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-8">
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Competencies</h4>
          <ul className="list-disc ml-6 space-y-1">
            {content.competencies.map((competency: string) => (
              <li key={competency} className="text-gray-600">
                {competency}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Learning Outcomes</h4>
          <ul className="list-disc ml-6 space-y-1">
            {content.learning_outcomes.map((outcome: string) => (
              <li key={outcome} className="text-gray-600">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <span className="block text-lg font-semibold mb-2 text-gray-700">Chapters</span>
        <div>
          <ProjectileMotionTopics projectileMotionData={content?.chapters} />
        </div>
      </div>
    </div>
  );
};

export default UnitComponent;
