import { Schema, z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, useUpdateUserInfoMutation } from "@/generated/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";
import useZustandHook from "@/hooks/useZustandHook";
import DatePickerForm from "../shared/date-picker-form";
import Editor from "../shared/editor";
import AvatarUpload from "./avatar-upload";
import Image from "next/image";
import { toast } from "../ui/use-toast";

const profileInfoSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  username: z.string(),
  address: z.string(),
  phone: z.string(),
  birthday: z.date(),
  image: z.string(),
  bio: z.string(),
  color: z.string().max(7),
});

type ProfileInfoType = {
  fullname: string;
  email: string;
  username: string;
  address: string;
  phone: string;
  birthday: Date;
  image: string;
  bio: string;
  color: string;
};

const ProfileEdit = () => {
  const userStorage = useUserStorage(state => state.user)
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userStorage?.image || "");

  const [updateAccount] = useUpdateUserInfoMutation()

  const [profileInfo, setProfileInfo] = useState<ProfileInfoType>({
    fullname: "",
    email: "",
    username: "",
    address: "",
    phone: "",
    birthday: new Date(),
    image: "",
    bio: "",
    color: "",
  });

  const form = useForm<z.infer<typeof profileInfoSchema>>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: profileInfoSchema.parse({
      fullname: (userStorage?.fullname as string) || "",
      email: (userStorage?.email as string) || "",
      username: (userStorage?.username as string) || "",
      address: (userStorage?.address as string) || "",
      phone: (userStorage?.phone as string) || "",
      birthday: new Date(userStorage?.birthday) || new Date(),
      image: (userStorage?.image as string) || "",
      bio: (userStorage?.bio as string) || "",
      color: (userStorage?.color as string) || "",
    }),
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    updateAccount({
      variables: {
        user: {
          userid: userStorage?.userid,
          ...profileInfo
        }
      }
    }).catch((err) => {
      toast({
          title: 'Lỗi',
          description: err.message,
          variant: 'destructive'
      })
  })
  }, [loading, updateAccount, profileInfo, userStorage?.userid])

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
    form.setValue("image", url);
  };

  const onSubmit = (values: z.infer<typeof profileInfoSchema>) => {
    setProfileInfo(values);
    setLoading(true);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="ml-2">
            Chỉnh sửa trang cá nhân
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[80vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa trang cá nhân</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin tại đây. Nhấn <span className="font-bold">Lưu</span> để lưu thay đổi.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Ảnh đại diện</FormLabel>
                    <FormControl>
                      <AvatarUpload onUploadComplete={handleAvatarUpload} />
                    </FormControl>
                    <div className="flex items-center justify-center mt-4">
                      {avatarUrl && <Image src={avatarUrl} alt="Avatar" className="w-40 h-40 rounded-full" width={200} height={200} />}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Họ tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyen Van A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DatePickerForm form={form} name="birthday" classname="w-full pl-3 text-left font-normal" />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Mô tả bản thân</FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Màu chủ đạo trang cá nhân</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-3">
                        <div className={"h-10 w-10 rounded-md border"} style={{ background: `${field.value}` }}></div>
                        <Input placeholder="#XXXXXX" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Lưu</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileEdit;
