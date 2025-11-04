import React from "react";
import BaseCard from "../cards/BaseCard";
import { Icon } from "@iconify/react/dist/iconify.js";

const SecondSection = () => {
  const cardContent = [
    {
      icon: "mdi:graduation-cap",
      title: "Set Exam",
      description:
        "Receive industry leading training from professionals all over the world!",
    },
    {
      icon: "line-md:speed",
      title: "Print Faster",
      description: "Less that a day to become a licensed taxi driver in Rwanda",
    },
    {
      icon: "ri:global-line",
      title: "Anywhere",
      description:
        "Easy to use and get used to. Navigating around the application, and content of the application.",
    },
  ];
  return (
    <section className="px-36 py-10 align-middle max-md:px-5 bg-primary/5">
        <div className="space-y-5 text-center">
          <span className="text-textDarkColor text-5xl font-normal max-md:text-3xl">
            Why Use
          </span>
          {"  "}
          <span className="text-textDarkColor text-5xl font-semibold max-md:text-3xl">
            Teacher?
          </span>
        </div>

        <div className="flex flex-row items-center justify-around gap-10 pt-10 max-md:flex-wrap">
          {cardContent.map((item) => (
            <BaseCard
              key={item.title}
              className="px-8 py-6 text-center space-y-2 flex flex-col items-center justify-center"
            >
              <div className="bg-menuIconBackground w-14 h-14 rounded-lg rounded-ss-3xl rounded-ee-3xl">
                <Icon
                  icon={item.icon}
                  fontSize={48}
                  className="text-textDarkColor -mx-4"
                />
              </div>
              <p className="text-textDarkColor text-3xl font-bold">
                {item.title}
              </p>
              <p className="text-textLightColor text-sm">{item.description}</p>
            </BaseCard>
          ))}
        </div>
    </section>
  );
};

export default SecondSection;
