/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Pagination from "./Pagination";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { EXAM_COLLECTION_NAME } from "@/constants/collectionNames";
import { toast } from "react-toastify";
import { generateId } from "@/util/helpers";
import {
  createDocEntry,
  deleteDocEntryById,
  updateDocEntry,
} from "@/services/firebase/helpers";

const CoursesTable = ({ data }: { data: Array<any> }) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModel, setOpenCourseModel] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    id: "",
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    updateTableData(
      data.filter((item) =>
        searchText.trim() === ""
          ? item
          : item.title.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [data, searchText]);

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const handleAddCourse = async (courseObj: "create" | any) => {
    if (courseObj === "create") {
      setOpenCourseModel(true);
    } else {
      setLoading(true);
      const courseFormat = editValues.title
        ? {
            ...editValues,
            title: courseObj.title,
            description: courseObj.description,
          }
        : {
            ...courseObj,
            id: generateId(courseObj.title),
            author: user,
            status: "pending",
            createdAt: new Date().toISOString(),
            materials: [],
          };

      const courseAdded = editValues.title
        ? await updateDocEntry(
            EXAM_COLLECTION_NAME,
            courseFormat.id,
            courseFormat
          )
        : await createDocEntry(EXAM_COLLECTION_NAME, courseFormat);
      if (courseAdded) {
        toast.success("Course Created", {
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 3000,
        });
        handleCloseModel();
      }
      setLoading(false);
    }
  };

  const handleCloseModel = () => {
    setOpenCourseModel(false);
    setEditValues({
      title: "",
      description: "",
      id: "",
    });
  };
  const handleEditCourse = (course: any) => {
    setOpenCourseModel(true);
    setEditValues({
      ...course,
      title: course.title,
      description: course.description,
    });
  };
  const handleDelete = async (course: any) => {
    const deleted = await deleteDocEntryById(EXAM_COLLECTION_NAME, course.id);
    if (deleted) {
      toast.success(`${course.id} is Deleted`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };
  console.log(data);

  return (
    <BaseCard className="px-10 py-5">
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSidebarSearch}
        inputClassName="rounded-md"
      />
      <div className="py-5 text-textLightColor text-base font-semibold flex flex-row justify-between items-center">
        <span>Total = {data.length}</span>
        <button
          type="button"
          onClick={() => handleAddCourse("create")}
          className="h-12 text-white bg-primary hover:bg-primaryDark focus:outline-none font-medium rounded-lg text-md text-center px-4"
        >
          Add New
        </button>
      </div>
      <div className="py-2.5 text-textLightColor text-base font-semibold flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-backgroundColor">
        <span className="w-full">Title</span>
        <span className="w-2/4">Course</span>
        <span className="w-2/4">Type of Exam</span>
        <span className="w-2/4">Questions</span>
        <span className="w-2/4">Actions</span>
      </div>
      <hr />
      <div>
        {tableData.map((item) => (
          <div key={item.id}>
            <div className="flex flex-row align-middle items-center py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
              <div className="w-full">
                <Link
                  href={`/exams/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  <span>{`${item.note.substring(0, 45)} ...`}</span>
                </Link>
              </div>
              <div className="text-sm w-2/4">
                <Link href={`/exams/${item.id}`}>
                  <span className="text-textLightColor font-light">
                    {item.course}
                  </span>
                </Link>
              </div>
              <div className="w-2/4">
                <Link
                  href={`/exams/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  <span>{item.examType}</span>
                </Link>
              </div>
              <div className="text-sm w-2/4">
                <Link href={`/exams/${item.id}`}>
                  <span className="text-textLightColor font-light">
                    {item.result?.length}
                  </span>
                </Link>
              </div>
              <div className="w-2/4">
                <button
                  className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                  type="button"
                  onClick={() => handleDelete(item)}
                >
                  <Icon icon="mdi:delete" fontSize={20} />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={1} totalPages={1} />
      </div>
    </BaseCard>
  );
};

export default CoursesTable;
