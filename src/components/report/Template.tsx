/* eslint-disable react/display-name */
import React, { useRef, forwardRef } from "react";
import LogoComponent from "../logo/LogoComponent";
import LogoIcon from "../logo/LogoIcon";
import BaseCard from "../cards/BaseCard";
import LineChart from "../charts/LineChart";
import { QuestionInterface } from "@/agents/assessment";
import QuestionComponent from "../questions/QuestionComponent";

interface ReportTemplateProps {
  questions: QuestionInterface[];
}

const ConstructTable = ({
  header,
  tableData,
}: {
  header: Array<string>;
  tableData: Array<Array<any>>;
}) => (
  <div>
    <div className="py-2.5 text-textLightColor text-base font-medium flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-backgroundColor">
      {header.map((item: any, index: number) => (
        <span key={index} className="w-full capitalize">
          {item}
        </span>
      ))}
    </div>
    <hr />
    <div>
      {tableData.map((item: any, index: number) => (
        <div key={index}>
          <div className="flex flex-row align-middle items-center py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
            {item.map((val: any, index: number) => (
              <span key={index} className="w-full capitalize px-2">
                {val}
              </span>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  </div>
);

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
              <LogoComponent />
              <h1 className="text-textLightColor text-2xl font-medium">
                Generated on {new Date().toLocaleString()}
              </h1>
            </div>
          </section>
          <hr />
          <section>
            <div>
              {questions.map((question: QuestionInterface) => (
                <div key={question.question}>
                  <QuestionComponent
                    content={question}
                    handleDeleteQuestion={() => null}
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
