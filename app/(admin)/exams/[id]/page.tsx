"use client";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Icon } from "@iconify/react/dist/iconify.js";
import BaseCard from "@/src/components/cards/BaseCard";
import { useParams } from "next/navigation";
import { findDocEntryById, updateDocEntry } from "@/services/firebase/helpers";
import { EXAM_COLLECTION_NAME } from "@/constants/collectionNames";
import Loading from "@/src/components/LoadingComponent";
import QuestionComponent from "@/src/components/questions/QuestionComponent";
import { QuestionInterface } from "@/agents/assessment";
import ReportTemplate from "@/src/components/report/Template";
import AddQuestion from "@/src/views/addQuestion/AddQuestion";
import BaseButton from "@/src/components/buttons/BaseButton";

const CourseDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [exam, setExam] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingQuestions, setAddingQuestions] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await findDocEntryById(
        EXAM_COLLECTION_NAME,
        `${params.id}`
      );
      setExam(result);
      setLoading(false);
    })();
  }, [params.id]);

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
        pdf.save(`Exam-${params.id}.pdf`);
        input.style.visibility = "hidden";
      });
    }
    setGenerating(false);
  };

  const questionDeleted = async (questionObj: any) => {
    setDeleting(true);
    const updatedExam = {
      ...exam,
      result: exam.result.filter(
        (elt: any) => elt.question !== questionObj.question
      ),
    };

    const result = await updateDocEntry(
      EXAM_COLLECTION_NAME,
      `${params.id}`,
      updatedExam
    );
    if (result) {
      const result = await findDocEntryById(
        EXAM_COLLECTION_NAME,
        `${params.id}`
      );
      setExam(result);
    }
    setDeleting(false);
  };

  const handleAddMoreQuestions = async (questions: any) => {
    setAddingQuestions(true);
    const updatedExam = {
      ...exam,
      result: exam.result.concat(questions.result),
    };

    const response = await updateDocEntry(
      EXAM_COLLECTION_NAME,
      `${params.id}`,
      updatedExam
    );
    if (response) {
      const result = await findDocEntryById(
        EXAM_COLLECTION_NAME,
        `${params.id}`
      );
      setExam(result);
    }

    setAddingQuestions(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-5">
        <div>
          <BaseButton
            handleSubmit={() => generateReport()}
            additionalStyles="w-auto flex flex-row items-center justify-center h-8 my-2 float-right"
            loading={generating}
          >
            <span className="pr-2">Print Exam</span>
            <Icon icon="material-symbols:print-outline-rounded" fontSize={24} />
          </BaseButton>
          <BaseCard className="px-10 py-10 w-full">
            {loading && !exam ? (
              <Loading />
            ) : (
              <div className="flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2 text-textDarkColor">
                <div className="w-full max-md:w-full">
                  <div className="py-5">
                    <h1 className="pb-5 text-xl font-semibold">
                      Exam Questions
                    </h1>
                    <div>
                      {exam?.result?.map(
                        (question: QuestionInterface, index: number) => (
                          <div key={question.question}>
                            <QuestionComponent
                              number={index + 1}
                              content={question}
                              handleDeleteQuestion={questionDeleted}
                              loading={deleting}
                            />
                            <br />
                            <hr className="py-2 text-primary" />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </BaseCard>
        </div>
        <BaseCard className="w-2/4">
          <AddQuestion
            exam={exam}
            loading={addingQuestions}
            handleAddMoreQuestions={handleAddMoreQuestions}
          />
        </BaseCard>
      </div>
      {exam?.result && (
        <div style={{ visibility: "hidden" }} ref={componentRef}>
          <ReportTemplate questions={exam.result} />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
