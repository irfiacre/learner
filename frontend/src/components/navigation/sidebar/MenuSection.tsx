"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuItem = ({ content }: { content: any }) => {
  const pathname: any = usePathname();
  const active = pathname.includes(content.url);

  return (
    <Link href={`/${content.url}`} scroll={false}>
      <div
        className={`py-4 px-3 flex flex-row justify-start items-center gap-4 ${
          active ? "bg-white rounded-xl" : " hover:bg-white hover:rounded-xl text-white hover:text-sidebar_background"
        }`}
      >
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
          <Icon
            icon={content.icon}
            fontSize={active ? 25 : 20}
            className="text-sidebar_background"
          />
        </div>
        <div className="">
          <p
            className={`text-lg mb-1 ${
              active ? "text-sidebar_background" : ""
            }`}
          >
            {content.title}
          </p>
          <p
            className={`text-sm ${
              active ? "text-sidebar_background/70" : "text-border_light"
            }`}
          >
            {content.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

const MenuSection = ({
  title,
  menuItems,
}: {
  title: string;
  menuItems: Array<any>;
}) => {
  return (
    <div className="">
      <p className="text-border_light text-xl">{title}</p>
      {menuItems.map((item) => (
        <MenuItem key={item.title} content={item} />
      ))}
    </div>
  );
};

export default MenuSection;
