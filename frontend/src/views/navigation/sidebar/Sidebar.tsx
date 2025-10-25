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
        subtitle: "Tegura Ikizamini",
        url: "dashboard",
        icon: "material-symbols:dashboard",
      },
    ],
    exams: [
      {
        title: "Past Exams",
        subtitle: "Ibizamini Byahise",
        url: "exams",
        icon: "material-symbols:dashboard",
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
        <LogoComponent small />
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
