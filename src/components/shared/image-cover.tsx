import Image from "next/image";

type ImageCoverProps = {
  image: string
  height?: number
}

const ImageCover = ({ image, height }: ImageCoverProps) => {
  return (
    <div style={{ height: height ? `${height}px` : ``}} className={`relative w-full ${height ? `` : "h-[480px]"} rounded-md`}>
      <div
        className={`w-full ${height ? `` : "h-[472px]"} bg-center absolute top-1 left-0 rounded-md blur-sm`}
        style={{ height: height ? `${height-8}px` : ``, backgroundImage: `url('${image || "/loginpage.jpg"}')`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }} >
      </div>
      <div style={{ height: height ? `${height}px` : ``}} className={`absolute w-full ${height ? `` : "h-[480px]"} top-0 left-0`}>
        <div style={{ height: height ? `${height}px` : ``}} className={`py-4 flex items-center justify-center bg-black bg-opacity-70 rounded-md w-full ${height ? `` : "h-[480px]"} relative`}>
          <Image
            src={image || "/loginpage.jpg"}
            alt="Textpage"
            layout="fill"
            className="rounded-md"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default ImageCover