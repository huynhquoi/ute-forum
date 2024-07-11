import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Picture, Send } from "../svgs"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useUserStorage } from "@/lib/store/userStorage"
import { Comment, useCreateCommentChildMutation, useCreateCommentMutation } from "@/generated/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCommentStorage } from "@/lib/store/commentStorage"
import useStorage from "@/hooks/useStorage"

type CommentFormProps = {
  postId: number,
  commentId?: number,
}

const commentSchema = z.object({
  content: z.string()
})

const CommentForm = ({ postId, commentId }: CommentFormProps) => {
  const {getItem} = useStorage()
  const [submit, setSubmit] = useState(false)
  const [onAdd, setOnAdd] = useState(true)
  const userStorage = useUserStorage((state) => state.user)
  const [content, setContent] = useState<string>("")
  const [CreateComment, { data, loading, error }] = useCreateCommentMutation()
  const [CreateCommentChild, { data: child }] = useCreateCommentChildMutation()

  const { addComment } = useCommentStorage()

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: ""
    }
  })

  useEffect(() => {
    if (!onAdd) {
      return
    }

    if (data?.create_comment?.commentid) {
      addComment(data.create_comment as Comment)
      setOnAdd(false)
    }

    if (child?.create_comment_in_comment?.commentid) {
      addComment(child.create_comment_in_comment as Comment)
      setOnAdd(false)
    }

  }, [addComment, child?.create_comment_in_comment, data?.create_comment, onAdd])


  useEffect(() => {
    if (!submit) {
      return
    }

    if (!content) {
      return
    }

    const submitComment = async () => {
      try {
        if (commentId) {
          await CreateCommentChild({
            variables: {
              comment: {
                content: content
              },
              userid: getItem('userId') as string,
              comment_parentid: commentId
            }
          });
        } else {
          await CreateComment({
            variables: {
              comment: {
                content: content
              },
              postid: postId,
              userid: getItem('userId') as string
            }
          });
        }

        setSubmit(false);
        form.reset();
      } catch (e) {
        console.error(e);
      }
    };

    submitComment();
    setSubmit(false);
  }, [CreateComment, CreateCommentChild, addComment, commentId, content, form, getItem, postId, submit])

  const onSubmit = (value: z.infer<typeof commentSchema>) => {
    setContent(value.content)
    setSubmit(true)
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start justify-between w-full mb-2">
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