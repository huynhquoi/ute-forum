"use client";

import { useGetUserSubscription } from "@/generated/types";

export default function Home() {
  const {data} = useGetUserSubscription({ variables: { userid: "1" } });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.sub_status_user?.username}
    </main>
  );
}
