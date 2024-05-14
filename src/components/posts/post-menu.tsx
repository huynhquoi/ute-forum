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

type PostMenuProps = {
  post: PostDto
  onDeleted?: () => void
}

const PostMenu = ({ post, onDeleted }: PostMenuProps) => {
  const [open, setOpen] = useState(false)
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
            <DropdownMenuItem>
              <Edit className="text-2xl text-blue-500 mr-4" />
              <span>Chỉnh sửa bài viết</span>
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
              deleteFile(imageLocation(post?.image as string))
              DeletePost({
                variables: {
                  postid: post?.postid
                }
              }).then(() => {
                if (typeof onDeleted !== "undefined") {
                  onDeleted()
                }
              })
            }}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default PostMenu