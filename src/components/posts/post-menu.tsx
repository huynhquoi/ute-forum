"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu"
import { Edit, ThreeDots, Trash } from "../svgs"
import { PostDto, useDeletePostMutation } from "@/generated/types"
import Notification from "../shared/notification";
import { Button } from "../ui/button"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import useFirebase from "@/hooks/useFirebase"
import { imageLocation } from "@/lib/utils"
import PostForm from "./post-form"
import { ScrollArea } from "../ui/scroll-area"
import { Textarea } from "../ui/textarea"
import { toast } from "../ui/use-toast"

type PostMenuProps = {
  post: PostDto
  onDeleted?: () => void
}

const PostMenu = ({ post, onDeleted }: PostMenuProps) => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)
  const [DeletePost] = useDeletePostMutation()
  const { deleteFile } = useFirebase()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="p-0">
            <ThreeDots className="text-2xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpen(true)}>
              <Trash className="text-2xl text-red-500 mr-4" />
              <span>Xóa bài viết</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              <Edit className="text-2xl text-blue-500 mr-4" />
              <span>Chỉnh sửa bài viết</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenWarning(true)}>
              <Edit className="text-2xl text-blue-500 mr-4" />
              <span>Kiểm tra từ ngữ nhạy cảm</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thông báo</AlertDialogTitle>
            <AlertDialogDescription>Bạn có chắc muốn xóa bài viết này?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if(post?.image) {
                deleteFile(imageLocation(post?.image as string))
              }
              DeletePost({
                variables: {
                  postid: post?.postid
                }
              }).then(() => {
                if (typeof onDeleted !== "undefined") {
                  onDeleted()
                }
              }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            })
            }}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
        <AlertDialogContent className="h-[80vh] sm:max-w-none w-[1000px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Chỉnh sửa bài viết</AlertDialogTitle>
          </AlertDialogHeader>
          <ScrollArea className="h-[70vh] pr-3">
            <div className="">
              <PostForm post={post as PostDto} onSubmitEdit={() => setOpenEdit(false)} />
            </div>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openWarning} onOpenChange={setOpenWarning}>
        <AlertDialogContent className="sm:max-w-none w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Từ ngữ nhạy cảm</AlertDialogTitle>
          </AlertDialogHeader>
          <ScrollArea className="pr-3">
            <div className="">
              {post?.warning === '1' ? <>
                <Textarea value={post?.warningword || ''} disabled={true} />
              </> : <>
              <div className="w-full text-center font-bold">Bài viết rất tuyệt vời</div>
              </>}
            </div>
          </ScrollArea>
          <Button onClick={() => {setOpenWarning(false)}}>Xác nhận</Button>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default PostMenu