"use client";
import React from "react";
import dynamic from "next/dynamic";
import LogoIcon from "../logo/LogoIcon";
import { useRouter } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const TopSection = () => {
  const router = useRouter();

  const handleBtnClicked = (condition: string) => {
    console.log("btn click");
    if (condition === "login") {
      router.push("/dashboard");
    } else {
      console.log("Send User to Download App Page");
    }
  };

  return (
    <section className="px-36 py-5 space-y-5 bg-primary/5 max-md:px-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <LogoIcon size={26} />
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <button
            type="button"
            onClick={() => handleBtnClicked("login")}
            className="capitalize text-white bg-primary hover:bg-primary/90 focus:outline-none  font-medium rounded-md text-md text-center py-2.5 px-5 disabled:bg-borderColorLight"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between pt-24 max-md:flex-wrap">
        <div className="space-y-5">
          <div>
            <span className="text-textDarkColor text-8xl font-semibold max-md:text-5xl">
              Welcome to
            </span>
            <br />
            <span className="text-primary text-7xl font-semibold max-md:text-4xl">
              Tcher
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
