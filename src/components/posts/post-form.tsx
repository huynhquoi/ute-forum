"use client"

import { Post, useCreatePostMutation } from "@/generated/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Editor from "../shared/editor"
import TopicSelect from "../shared/topic-select"
import { Button } from "../ui/button"
import { useUserStorage } from "@/lib/store/userStorage"
import Image from "next/image"

const PostChema = z.object({
  title: z.string(),
  topic: z.string().array(),
  content: z.string(),
  image: z.string(),
  requiredReputation: z.string(),
})

type PostDataType = {
  title: string,
  topic: string[],
  content: string,
  image: string,
  requiredReputation: string,
}

function getImageData(event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  const reader = new FileReader();
  reader.readAsDataURL(event.target.files![0])
  reader.onload = (e) => {
    onChange(reader.result as string);
    console.log(reader.result)
  }

  return { displayUrl };
}

const PostForm = () => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false)
  const [createPost] = useCreatePostMutation()
  const userStorage = useUserStorage(state => state.user)

  const [postData, setPostData] = useState<PostDataType>({
    title: "",
    topic: [],
    content: "",
    image: "",
    requiredReputation: "",
  })
  const form = useForm<z.infer<typeof PostChema>>({
    resolver: zodResolver(PostChema),
    defaultValues: {
      title: "",
      topic: [],
      content: "",
      image: "",
      requiredReputation: ""
    },
  });

  useEffect(() => {
    if (!loading) {
      return
    }

    createPost({
      variables: {
        user: {
          userid: userStorage?.userid
        },
        post: {
          image: postData.image,
          content: postData.content,
          title: postData.title,
          requiredreputation: parseInt(postData.requiredReputation)
        },
        topic: postData.topic.map(item => ({
          topicid: parseInt(item)
        }))
      }
    }).then(() => {
      setLoading(true)
    })

  }, [loading, postData, userStorage?.userid])

  const onSubmit = (values: z.infer<typeof PostChema>) => {
    setPostData(values);
    setLoading(true)
    // console.log(values)
  };
  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Tiêu đề bài viết <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Tiêu đề bài viết" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TopicSelect form={form} label="Topic" name="topic" classname="w-full justify-between" />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Tiêu đề bài viết <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <>
                  {value ?
                    <Image src={preview} alt={value} width={400} height={200} />
                    : <></>}
                  <Input
                    placeholder="Tiêu đề bài viết"
                    type="file"
                    {...rest}
                    onChange={(event) => {
                      const {displayUrl } = getImageData(event, onChange)
                      setPreview(displayUrl);
                      // onChange(files);
                    }} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredReputation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Điểm reputation tối thiểu <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Nội dung bài viết <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Editor placeholder="Nội dung..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          Đăng bài
        </Button>
      </form>
    </Form>
  </>
}

export default PostForm