"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/Player";
import { getCourseData } from "@/lib/api";
import CoursesTable from "@/components/tables/Courses";

export default function CoursesPage() {
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
  
  console.log("=====>", courses);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        <CoursesTable data={courses} loading={loading} />
      </motion.div>
    </div>
  );
}
