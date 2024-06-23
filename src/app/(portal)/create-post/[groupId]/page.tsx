"use client"

import PostForm from "@/components/posts/post-form"
import { useParams } from "next/navigation"

const CreatePostGroupPage = () => {
    const param = useParams()
    return <>
        <PostForm groupId={parseInt(param.groupId as string)} />
    </>
}

export default CreatePostGroupPage