import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useUserStorage } from "@/lib/store/userStorage";
import { User } from "@/generated/types";

type UserDisplayProps = {
  user?: User;
  descripttion?: string;
  useName?: boolean;
  useDescription?: boolean;
  ai?: boolean;
};

const UserDisplay = ({
  user,
  descripttion,
  useName,
  useDescription,
  ai
}: UserDisplayProps & AvatarProps) => {
  const router = useRouter()
  const users = useUserStorage(state => state.user)
  return (
    <>
      {!ai
        ? <div className="flex items-center cursor-pointer" onClick={() => {
          if (user?.userid == users?.userid) {
            router.push(`/profile`)
          } else {
            router.push(`/profile/${user?.userid}`)
          }
        }}>
          <Avatar>
            <AvatarImage src={user?.image || "/userLogo.png"} alt="CN"></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="font-bold">{user?.fullname}</p>
            <p className="text-sm">{descripttion}</p>
          </div>
        </div>
        : <div className="flex items-center">
          <Avatar>
            <AvatarImage src={"/AI.png"} alt="CN"></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="font-bold">Gemini AI</p>
          </div>
        </div>}
    </>
  );
};
export default UserDisplay;
