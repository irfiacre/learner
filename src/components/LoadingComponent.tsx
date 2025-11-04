"use client";
import React from "react";
import { Icon } from "@iconify/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-[15vh]">
      <Icon icon="eos-icons:loading" className="text-primary" fontSize={42} />
    </div>
  );
};

export default Loading;
