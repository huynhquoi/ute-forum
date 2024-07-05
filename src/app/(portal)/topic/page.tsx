"use client"

import PostCard from "@/components/posts/post-card"
import TopicSelect from "@/components/shared/topic-select"
import { Learn, Plus } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { PostDto, useGetPostByTopicIdQuery, useGetTopicQuery } from "@/generated/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const topicSchema = z.object({
  topicId: z.string().array()
});

const TopicPage = () => {
  const [search, setSearch] = useState(false);
  const [topicSearch, setTopicSearch] = useState<{ topicId: string[] }>({
    topicId: []
  })

  const [oneTopic, setOneTopic] = useState(0)

  const { data: post, loading, error, fetchMore: GetPost } = useGetPostByTopicIdQuery({
    variables: {
      topicid: oneTopic
    }
  })
  const { data } = useGetTopicQuery()

  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topicId: []
    }
  })

  const onSubmit = (values: z.infer<typeof topicSchema>) => {
    setTopicSearch(values)
  };
  return <>
    {search ? <Form {...form}>
      <form className="space-y-4 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <TopicSelect form={form} label="Chọn chủ đề bạn muốn tìm" name="topicId" classname="" />
        <Button type="submit" className="w-full" disabled={loading}>
          Tìm kiếm
        </Button>
      </form>
    </Form>
      : <div className="grid grid-cols-4 gap-6">
        {data?.topic?.map((item) => (
          <Link key={item?.topicid} href={`#`}>
            <Card onClick={() => setOneTopic(item?.topicid as number)}>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Learn className="text-4xl mr-4" />
                  {item?.topicname}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Link href={`#`}>
          <Card onClick={() => setSearch(true)}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Plus className="text-4xl mr-4" />
                Tìm nhiều hơn
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>}
    {post?.find_post_by_topicid?.length ? <>
      {post?.find_post_by_topicid?.map((item) => (
        <PostCard post={item as PostDto} key={item?.postid} />
      ))}
    </> : <></>}
  </>
}

export default TopicPage