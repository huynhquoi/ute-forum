import { useUserStorage } from "@/lib/store/userStorage"
import BookmarkItem from "../bookmark/bookmark-item"

const SavedZone = () => {
    const bookmarks = useUserStorage((state) => state.bookmarks)
    return <>
        {bookmarks.map((item, index) => <BookmarkItem key={index} bookmark={item}></BookmarkItem>)}
    </>
}

export default SavedZone