"use client";
import React, { useEffect, useState } from "react";
import CoursesTable from "@/src/components/tables/CoursesTable";
import isAuth from "@/src/components/isAuth";
import {
  getCollectionEntries,
  subscribeToCollection,
} from "@/services/firebase/helpers";
import { EXAM_COLLECTION_NAME } from "@/constants/collectionNames";
import Loading from "@/src/components/LoadingComponent";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const initialFindApplications = async () => {
    setLoading(true);
    const result = await getCollectionEntries(EXAM_COLLECTION_NAME);
    setData(result);
    setLoading(false);
  };

  const handleOnUpdateData = (newChanges: any) =>
    setData((prevData: any) => [...prevData, newChanges]);

  useEffect(() => {
    initialFindApplications();
    return () => subscribeToCollection(EXAM_COLLECTION_NAME, handleOnUpdateData);
  }, []);  

  return <div>{loading ? <Loading /> : <CoursesTable data={data} />}</div>;
};

export default (Courses);
