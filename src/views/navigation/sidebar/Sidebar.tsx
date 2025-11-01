"use client";
import SearchableInput from "@/src/components/inputs/SearchInput";
import LogoComponent from "@/src/components/logo/LogoComponent";
import React, { useState } from "react";
import { MenuItem } from "./MenuSection";

export const Sidebar = () => {
  const sidebarMenu = {
    dashboard: [
      {
        title: "Set Exam",
        subtitle: "Prepare exam",
        url: "dashboard",
        icon: "ph:exam-fill",
      },
    ],
    exams: [
      {
        title: "Exams",
        subtitle: "Show exams",
        url: "exams",
        icon: "lsicon:paste-filled",
      },
    ],

  };
  const [searchText, setSearchText] = useState("");

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <div className="px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6">
      <div>
        <LogoComponent />
        <div className="p-3.5">
          <SearchableInput
            inputID="sidebarSearch"
            value={searchText}
            onInputChange={handleSidebarSearch}
            inputClassName="rounded-xl"
          />
        </div>
      </div>
      <div>
        <MenuItem content={sidebarMenu.dashboard[0]} />
      </div>
      <div>
        <MenuItem content={sidebarMenu.exams[0]} />
      </div>
    </div>
  );
};
