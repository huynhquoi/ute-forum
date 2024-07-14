"use client"

import { Post, PostDto, useCreatePostInGroupMutation, useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from "@/generated/types"
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
import useFirebase from "@/hooks/useFirebase"
import { Progress } from "../ui/progress"
import { Close, Loading } from "../svgs"
import Notification from "../shared/notification"
import { imageLocation, sanitizeString } from "@/lib/utils"
import { useRouter } from "next/navigation"
import ChatAI from "./chat-ai"
import { toast } from "../ui/use-toast"

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

type PostFormType = {
  post?: PostDto,
  groupId?: number,
  onSubmitEdit?: () => void
}

const PostForm = ({ post, groupId, onSubmitEdit }: PostFormType) => {
  const [preview, setPreview] = useState(post?.image || "");
  const [loading, setLoading] = useState(false)
  const [imageProgress, setImageProgress] = useState(0);
  const [createPost, { error }] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [createGroupPost] = useCreatePostInGroupMutation()
  const userStorage = useUserStorage(state => state.user)
  const { uploadFile, setProgressCallback, deleteFile } = useFirebase()
  const router = useRouter()

  const { fetchMore } = useGetPostQuery({
    variables: {
      limit: 100,
      pacing: 1
    }
  })

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
      title: post?.title || "",
      topic: post?.listtopic?.map(item => item?.topic_posttopic?.topicid.toString()) || [],
      content: post?.content || "",
      image: post?.image || "",
      requiredReputation: post?.requiredreputation?.toString() || "",
    },
  });

  const handleProgress = (progress: number) => {
    setImageProgress(progress);
  };

  setProgressCallback(handleProgress);

  useEffect(() => {
    if (!loading) {
      return
    }

    if (post?.postid) {
      updatePost({
        variables: {
          post: {
            postid: post?.postid,
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
        fetchMore({
          variables: {
            limit: 100,
            pacing: 1
          }
        }).then(() => {
          setLoading(true)
          router.push("/home")
        }).catch((err) => {
          toast({
              title: 'Lỗi',
              description: err.message,
              variant: 'destructive'
          })
      })
        return
      })
    }

    if (!groupId) {
      if (post?.postid) {
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
        fetchMore({
          variables: {
            limit: 100,
            pacing: 1
          }
        }).then(() => {
          setLoading(true)
          router.push("/home")
        })
      }).catch((err) => {
        toast({
            title: 'Lỗi',
            description: err.message,
            variant: 'destructive'
        })
    })
    } else {
      if (post?.postid) {
        return
      }
      createGroupPost({
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
          })),
          groupid: groupId
        }
      }).then(() => {
        setLoading(true)
        router.push(`/forum/${groupId}`)
      }).catch((err) => {
        toast({
            title: 'Lỗi',
            description: err.message,
            variant: 'destructive'
        })
    })
    }

  }, [createGroupPost, createPost, fetchMore, groupId, loading, onSubmitEdit, post?.postid, postData, router, updatePost, userStorage?.userid])

  const onSubmit = (values: z.infer<typeof PostChema>) => {
    setPostData(values);
    setLoading(true)
  };

  const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
    const dataTransfer = new DataTransfer();

    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { displayUrl };
  }

  const handelRemoveImage = (url: string) => {
    form.resetField("image");
    setPreview("");
    deleteFile(imageLocation(url))
  }
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
                Ảnh <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <div className="flex items-center justify-center">
                    {value && preview ?
                      <div className="w-[400px] relative">
                        <Close
                          className="text-2xl absolute top-8 right-1 translate-x-[-50%] translate-y-[-100%] hover:cursor-pointer"
                        />
                        <Notification
                          title="Thông báo"
                          content="Bạn muốn xóa ảnh này?"
                          action={true}
                          onOK={() => {
                            handelRemoveImage(value)
                          }}
                        >
                          <div
                            className="hover:opacity-60 hover:cursor-pointer"
                          >
                            <Image src={preview} alt={value} width={400} height={200} />
                          </div>
                        </Notification>
                      </div>
                      : preview ? <>
                        <div className="relative">
                          <div className="opacity-60">
                            <Image src={preview} alt={value} width={400} height={200} />
                          </div>
                          <Progress value={imageProgress} className="w-[300px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-100%]" />
                        </div>
                      </> : <>
                        <Input
                          placeholder="Ảnh"
                          type="file"
                          {...rest}
                          onChange={(event) => {
                            const { displayUrl } = getImageData(event)
                            setPreview(displayUrl);
                            uploadFile(event.target.files![0], sanitizeString(form.getValues("title"), true)).then((url) => {
                              onChange(url)
                              setPreview(url as string);
                            })
                            // // onChange(files);

                          }}
                          disabled={!form.getValues("title")} /></>}
                  </div>

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
        <ChatAI>
          <Button variant={'outline'} className="border-fuchsia-500 text-fuchsia-500 bg-fuchsia-50 hover:bg-white hover:text-fuchsia-500">Chat Gemini</Button>
        </ChatAI>
        <Button
          variant={'outline'}
          className="border-green-500 text-green-500 bg-green-50 hover:bg-white hover:text-green-500 w-full"
          type="submit"
          disabled={loading}
        >
          {post?.postid ? "Chỉnh sửa" : "Đăng bài"}
          {loading ? <Loading className="animate-spin text-green-500 text-base ml-2" /> : <></>}
        </Button>
      </form>
    </Form>
  </>
}

export default PostForm