"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Link from "next/link";

const CoursesTable = ({
  data,
  loading,
}: {
  data: Array<any>;
  loading: boolean;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);

  useEffect(() => {
    updateTableData(data);
  }, [data, searchText]);

  return (
    <div>
      <p className="py-2.5 text-textLightColor text-base font-semibold">
        Courses ({data.length})
      </p>
      <div className="py-2.5 text-textLightColor text-base font- flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-primary/10">
        <span className="w-full">Name</span>
        <span className="w-full max-sm:hidden">References</span>
        <span className="w-full max-sm:hidden">Units</span>
      </div>
      <hr />
      {loading || !tableData[0] ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
          <span>{`${loading ? "Loading Data..." : "No courses so far"}`}</span>
        </div>
      ) : (
        <div>
          {tableData.map((item) => (
            <div key={item.id} className="bg-white">
              <Link href={`/courses/${item.id}`}>
                <div className="flex flex-row align-middle items-start py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
                  <div className="text-sm w-full">
                    <span className="text-textLightColor font-medium">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-sm w-full max-sm:hidden">
                    <span>has ({item.references.length})</span>
                  </div>
                  <div className="text-sm w-full max-sm:hidden">
                    <span>has ({item.units.length})</span>
                  </div>
                </div>
              </Link>

              <hr />
            </div>
          ))}
        </div>
      )}
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={3} totalPages={1} />
      </div>
    </div>
  );
};

export default CoursesTable;
