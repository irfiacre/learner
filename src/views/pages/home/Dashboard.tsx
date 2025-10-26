import React, { useEffect, useState } from "react";
import { getAllStaff } from "@/services/firebase/authentication";
import {
  getCollectionEntries,
  subscribeToCollection,
} from "@/services/firebase/helpers";
import { EXAM_COLLECTION_NAME } from "@/constants/collectionNames";
import ExamDescriptionForm from "../../forms/ExamDescriptionForm";

const DashboardPage = () => {
  const moreStatistics = [
    { title: "Finished Onboarding", count: 0 },
    { title: "Currently Onboarding", count: 2 },
    { title: "Available courses", count: 1 },
  ];
  const fetchStaff = async () => await getAllStaff();

  const [allStaff, setStaff] = useState([]);
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const initialFindApplications = async () => {
    setLoading(true);
    const result = await getCollectionEntries(EXAM_COLLECTION_NAME);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      if (userObj.role === "admin") {
        fetchStaff().then((result: any) => setStaff(result));
      }
      setUser(userObj);
    }
  }, []);

  const [data, setData] = useState<any>([]);
  const handleOnUpdateData = (newChanges: any) =>
    setData((prevData: any) => [...prevData, newChanges]);

  useEffect(() => {
    initialFindApplications();
    return () =>
      subscribeToCollection(EXAM_COLLECTION_NAME, handleOnUpdateData);
  }, []);

  const handleFormSubmitted = () => {};

  return (
    <div className="flex flex-col gap-5">
      <div>
        <ExamDescriptionForm onFormSubmit={handleFormSubmitted} />
      </div>
    </div>
  );
};

export default DashboardPage;
