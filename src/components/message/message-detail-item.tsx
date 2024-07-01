type MessageDetailItemProps = {
    content: string,
    byMe: boolean,
}

const MessageDetailItem = ({ content, byMe }: MessageDetailItemProps) => {
    return <>
        <div className={`flex items-center mt-2 ${byMe ? 'justify-end' : ''}`}>
            <div className={`${byMe ? 'bg-black text-white' : 'bg-gray-100'} rounded-full w-fit px-4 py-2`}>{content}</div>
        </div>
    </>
}

export default MessageDetailItem