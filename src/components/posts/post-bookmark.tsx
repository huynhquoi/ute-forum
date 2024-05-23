import { useState } from "react";
import { Bookmark, BookmarkFill } from "../svgs"
import { Button } from "../ui/button"

const PostBookmark = () => {
  const [showBookmark, setShowBookmark] = useState(true);

  const handleClick = () => {
    setShowBookmark(false);
  };

  return <>
    <Button
      variant={"secondary"}
      className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
      onClick={handleClick}
      style={{ position: "relative", padding: "8px 16px" }}
    >
      <div className="w-6 h-6"></div>
      <Bookmark
        className="text-2xl"
        style={{ position: "absolute", zIndex: showBookmark ? 1 : -1 }}
      />
      <BookmarkFill
        className="text-2xl text-purple-500"
        style={{
          position: "absolute",
          opacity: showBookmark ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </Button>
  </>
}

export default PostBookmark