import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Picture, Send } from "../svgs"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useUserStorage } from "@/lib/store/userStorage"
import { useCreateCommentChildMutation, useCreateCommentMutation } from "@/generated/types"
import { zodResolver } from "@hookform/resolvers/zod"

type CommentFormProps = {
  postId: number,
  onReload?: () => void,
  onComment?: () => void,
  commentId?: number,
}

const commentSchema = z.object({
  content: z.string()
})

const CommentForm = ({ postId, onReload, commentId, onComment }: CommentFormProps) => {

  const [submit, setSubmit] = useState(false)
  const userStorage = useUserStorage((state) => state.user)
  const [content, setContent] = useState<string>("")
  const [CreateComment] = useCreateCommentMutation()
  const [CreateCommentChild] = useCreateCommentChildMutation()

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: ""
    }
  })


  useEffect(() => {
    if (!submit) {
      return
    }

    if (!content) {
      return
    }

    if (commentId) {
      CreateCommentChild({
        variables: {
          comment: {
            content: content
          },
          userid: userStorage?.userid as string,
          comment_parentid: commentId
        }
      }).then(() => {
        if (typeof onReload !== "undefined") {
          onReload()
        }
        setSubmit(false)
        form.resetField("content")
      })
    } else {
      CreateComment(({
        variables: {
          comment: {
            content: content
          },
          postid: postId,
          userid: userStorage?.userid as string
        }
      })).then(() => {
        if (typeof onReload !== "undefined") {
          onReload()
        }
        setSubmit(false)
        form.resetField("content")
      })
    }
  }, [CreateComment, CreateCommentChild, commentId, content, form, onReload, postId, submit, userStorage?.userid])

  const onSubmit = (value: z.infer<typeof commentSchema>) => {
    setContent(value.content)
    setSubmit(true)
    if (typeof onComment !== "undefined") {
      onComment()
    }
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start justify-between">
        <div className="flex items-start justify-start w-[95%]">
          <Button variant={"ghost"} className="p-0 m-0">
            <Picture className="text-3xl mr-4" />
          </Button>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-[90%]">
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="px-2 ml-4"><Send className="text-2xl" /></Button>
      </form>
    </Form>
  </>
}

export default CommentForm