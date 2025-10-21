"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Image from "next/image";
import BaseCard from "@/components/cards/BaseCard";
import { getCourseData } from "@/lib/api";
import UnitComponent from "@/components/course/UnitComponent";

const EventPage = ({ user }: { user: any }) => {
  const params: any = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Array<object>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result: any = await getCourseData();
        setCourses(result);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const deleteEvent = async (courseId: string) => {
    // const result = await manageEvent(courseId, "DELETE");
    // toast.success("Your course was REMOVED successfuly!", {
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   autoClose: 2000,
    // });
    // router.replace("/dashboard");
  };

  if (loading)
    return (
      <BaseCard className="text-center p-10 text-textDarkColor space-y-5">
        <div>Loading...</div>
      </BaseCard>
    );

  // const handleConfirmDelete = () => {
  //   deleteEvent(course.id!);
  //   setOpen(false);
  // };
  const course = courses[0] ?? {};

  return (
    <div>
      <div>
        <div className="inline-flex items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-primary hover:text-white focus:outline-none cursor-pointer">
          <Link href="">
            <Icon icon="tabler:edit" fontSize={28} />
          </Link>
        </div>
      </div>
      <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
        <div>
          {/* {open && (
          <ConfirmModel
            title={`Are you sure you want to delete "${course.title}"`}
            message="This action is irreversible and permanent"
            loading={loading}
            handleConfirmed={handleConfirmDelete}
            handleClose={() => setOpen(false)}
            isDelete
          />
        )} */}
          <div className="flex flex-row max-md:flex-col">
            <div className="w-full pr-5 space-y-2">
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold text-textDarkColor">
                  Title: {course?.name}
                </h1>
              </div>
              <div className="w-full">
                <div>
                  <div>
                    <h1>Units</h1>

                    {course?.units?.map((unit: object) => (
                      <UnitComponent content={unit} key={unit.title} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-textLightColor py-5 text-justify">
                {course?.description}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default EventPage;
