"use client";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PulseLoader } from "react-spinners";
import BaseCard from "@/src/components/cards/BaseCard";
import { useParams } from "next/navigation";
import { subscribeToDocument } from "@/services/firebase/helpers";
import { EXAM_COLLECTION_NAME } from "@/constants/collectionNames";
import Loading from "@/src/components/LoadingComponent";
import QuestionComponent from "@/src/components/questions/QuestionComponent";
import { QuestionInterface } from "@/agents/assessment";
import ReportTemplate from "@/src/components/report/Template";

const CourseDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState({});
  const [exam, setExam] = useState<any>({});
  const [generating, setGenerating] = useState(false);
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  });

  const handleOnUpdateData = (newChanges: any) => {
    setExam(newChanges);
    setLoading(false);
  };
  useEffect(() => {
    return () =>
      subscribeToDocument(
        EXAM_COLLECTION_NAME,
        handleOnUpdateData,
        params.id.toLocaleString()
      );
  }, [params.id]);

  const handleMaterialClick = (material: any) => setSelectedMaterial(material);

  const componentRef = useRef<HTMLDivElement>(null);

  const generateReport = () => {
    setGenerating(true);
    const input = componentRef.current;
    if (input) {
      input.style.visibility = "visible";
      html2canvas(input, { scale: 5 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        if (imgHeight > pageHeight) {
          let position = 0;
          for (let i = 0; i <= 3; i++) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
            if (heightLeft > 0) {
              pdf.addPage();
            }
          }
        } else {
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }
        pdf.save(`Exam-${dateRange.startDate}-${dateRange.endDate}.pdf`);
        input.style.visibility = "hidden";
      });
    }
    setGenerating(false);
  };

  return (
    <div>
      <BaseCard className="px-10 py-10">
        {!exam?.id ? (
          <Loading />
        ) : (
          <div className="flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2 text-textDarkColor">
            <div className="w-full max-md:w-full">
              <button
                type="button"
                onClick={() => generateReport()}
                className="h-12 text-white bg-primary hover:bg-primary/90 focus:outline-none font-medium rounded-lg text-md text-center px-4 flex flex-row items-center justify-center float-right"
              >
                {generating ? (
                  <PulseLoader
                    color={"#ffffff"}
                    loading={generating}
                    size={10}
                    cssOverride={{ width: "100%" }}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    speedMultiplier={0.5}
                  />
                ) : (
                  <span className="pr-2">Print Exam</span>
                )}
                <Icon
                  icon="material-symbols:print-outline-rounded"
                  fontSize={24}
                />
              </button>
              <div className="py-5">
                <h1 className="pb-5 text-xl font-semibold">Exam Questions</h1>
                <div>
                  {exam.result.map((question: QuestionInterface) => (
                    <div key={question.question}>
                      <QuestionComponent
                        content={question}
                        handleDeleteQuestion={() => console.log("=======")}
                      />
                      <br />
                      <hr className="py-2 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </BaseCard>
      {exam.result && (
        <div style={{ visibility: "hidden" }} ref={componentRef}>
          <ReportTemplate questions={exam.result} />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
