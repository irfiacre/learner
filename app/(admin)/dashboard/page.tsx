"use client";
import DashboardPage from "@/src/views/pages/home/Dashboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);
  return <DashboardPage />;
}
