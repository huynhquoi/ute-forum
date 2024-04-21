"use client";

import useStorage from "@/hooks/useStorage";
import { redirect } from "next/navigation";

export default function Home() {
  const { getItem } = useStorage();

  if (getItem("name").length === 0) {
    redirect("/home");
  }
  return <main>Home</main>;
}
