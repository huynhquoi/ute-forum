import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserDisplayProps = {
  user?: any;
  descripttion?: string;
  useName?: boolean;
  useDescription?: boolean;
};

const UserDisplay = ({
  user,
  descripttion,
  useName,
  useDescription,
}: UserDisplayProps & AvatarProps) => {
  return (
    <>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={"/userLogo.png"} alt="CN"></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="font-bold">{user?.fullname}</p>
          <p className="text-sm">{descripttion}</p>
        </div>
      </div>
    </>
  );
};
export default UserDisplay;
