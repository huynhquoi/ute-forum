"use client";

import useStorage from "@/hooks/useStorage";
import { redirect } from "next/navigation";

export default function Home() {
  const { getItem } = useStorage();

  if (getItem("userId", "session")?.length === 0 || getItem("userId", "session")?.length === undefined) {
    redirect("/login");
  }
  return <main>Home</main>;
}
