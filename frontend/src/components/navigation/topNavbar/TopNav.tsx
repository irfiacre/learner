"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TopNav = () => {
  const params = useParams();
  const [currentTitle, setCurrentTitle] = useState("Overview");

  useEffect(() => {
    setCurrentTitle(
      params.id ? `${String(params.id).substring(0, 20)}...` : "overview"
    );
  }, [params]);

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl capitalize">{currentTitle}</h1>
      <div className="mr-6 flex flex-row gap-3 items-center text-notificationIconColor">
        <div className="">
          <Icon icon="zondicons:notification" fontSize={20} />
        </div>
        <div>|</div>
        <div>
          <span>xxx</span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TopNav;
