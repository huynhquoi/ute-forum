import { useGetAccountByPkQuery, User } from "@/generated/types"
import UserDisplay from "../users/user-display"

type MessageDetailItemProps = {
    content: string,
    byMe: boolean,
    inGroup?: boolean,
    userId?: string,
}

const MessageDetailItem = ({ content, byMe, inGroup, userId }: MessageDetailItemProps) => {
    const { data } = useGetAccountByPkQuery({
        variables: {
            userId: userId || ''
        },
        skip: !userId
    })
    return <>
        <div className={`flex items-center mt-2 ${byMe ? 'justify-end' : ''}`}>
            <div className={`${byMe ? 'bg-black text-white' : 'bg-gray-100'} rounded-full w-fit px-4 py-2`}>{content}</div>
        </div>
    </>
}

export default MessageDetailItem