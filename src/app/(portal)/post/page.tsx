"use client";

import { redirect } from "next/navigation";

const PostPage = () => {
  redirect("/home");
  return <>Post Page</>;
};

export default PostPage;
