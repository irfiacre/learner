/* eslint-disable react/display-name */
import React from "react";
import { QuestionInterface } from "@/agents/assessment";
import QuestionComponent from "../questions/QuestionComponent";

interface ReportTemplateProps {
  questions: QuestionInterface[];
}

const ReportTemplate = React.forwardRef<HTMLDivElement, ReportTemplateProps>(
  (props, ref): any => {
    const { questions }: any = props;

    return (
      <div
        ref={ref}
        style={{
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        <div className="p-5 space-y-10">
          <section className="flex flex-row items-end justify-between">
            <div className="flex flex-row items-center gap-2">
              <h1>Exam Generated</h1>
              <h1 className="text-textLightColor text-2xl font-medium">
                Generated on {new Date().toLocaleString()}
              </h1>
            </div>
          </section>
          <hr />
          <section>
            <div>
              {questions.map((question: QuestionInterface, index: number) => (
                <div key={question.question}>
                  <QuestionComponent
                    number={index + 1}
                    content={question}
                    handleDeleteQuestion={() => null}
                    printerMode
                  />
                  <br />
                  <hr className="py-2 text-primary" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
);

export default ReportTemplate;
