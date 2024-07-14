import { useEffect, useState } from "react";
import { BookmarkIcon, BookmarkFill } from "../svgs"
import { Button } from "../ui/button"
import { useUserStorage } from "@/lib/store/userStorage";
import { Bookmark, useCreateBookmarkMutation, useDeleteBookmarkMutation } from "@/generated/types";
import { toast } from "../ui/use-toast";

type PostBookmarkProps = {
  postId: number;
}

const PostBookmark = ({ postId }: PostBookmarkProps) => {
  const [showBookmark, setShowBookmark] = useState(false);
  const [loading, setLoading] = useState(false)
  const [checkBookmarked, setCheckBookmarked] = useState(false);
  const [createBookmark, { data }] = useCreateBookmarkMutation()
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const userBookmark = useUserStorage(state => state.bookmarks)
  const addBookmark = useUserStorage((state) => state.addBookmark)
  const removeBookmark = useUserStorage((state) => state.removeBookmark)
  const authStore = useUserStorage(state => state.user)

  useEffect(() => {
    if (!userBookmark) {
      return
    }
    if (checkBookmarked) {
      return
    }

    console.log(userBookmark.some((item) => item?.post_bookmark?.postid === postId))

    setShowBookmark(userBookmark.some((item) => item?.post_bookmark?.postid === postId))

    setCheckBookmarked(true)
  }, [checkBookmarked, postId, userBookmark])

  const handleClick = () => {
    setShowBookmark(!showBookmark);
    if (!showBookmark) {
      setLoading(true)
      createBookmark({
        variables: {
          postid: postId,
          userid: authStore?.userid
        }
      }).then(() => {
        addBookmark(data?.create_bookmark as Bookmark)
        setLoading(false)
      }).catch((err) => {
        toast({
            title: 'Lỗi',
            description: err.message,
            variant: 'destructive'
        })
    })
    } else {
      setLoading(true)
      deleteBookmark({
        variables: {
          postid: postId,
          userid: authStore?.userid
        }
      }).then(() => {
        removeBookmark(userBookmark?.filter(item => item?.post_bookmark?.postid === postId)[0])
        setLoading(false)
      }).catch((err) => {
        toast({
            title: 'Lỗi',
            description: err.message,
            variant: 'destructive'
        })
    })
    }
  };

  return <>
    <Button
      variant={"secondary"}
      className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
      onClick={handleClick}
      style={{ position: "relative", padding: "8px 16px" }}
      disabled={loading}
    >
      <div className="w-6 h-6"></div>
      <BookmarkIcon
        className="text-2xl"
        style={{ position: "absolute", zIndex: showBookmark ? -1 : 1 }}
      />
      <BookmarkFill
        className="text-2xl text-purple-500"
        style={{
          position: "absolute",
          opacity: showBookmark ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </Button>
  </>
}

export default PostBookmark