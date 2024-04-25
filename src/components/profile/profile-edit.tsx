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

const profileInfoSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  username: z.string(),
  address: z.string(),
  phone: z.string(),
  birthday: z.date(),
  image: z.string(),
});

type ProfileInfoType = {
  fullname: string;
  email: string;
  username: string;
  address: string;
  phone: string;
  birthday: Date;
  image: string;
};

const ProfileEdit = () => {
  const userStorage = useUserStorage(state => state.user)
  const [loading, setLoading] = useState(false);

  const [updateAccount] = useUpdateUserInfoMutation()

  const [profileInfo, setProfileInfo] = useState<ProfileInfoType>({
    fullname: "",
    email: "",
    username: "",
    address: "",
    phone: "",
    birthday: new Date(),
    image: "",
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
    })
  }, [loading, updateAccount, profileInfo, userStorage?.userid])

  const onSubmit = (values: z.infer<typeof profileInfoSchema>) => {
    setProfileInfo(values);
    setLoading(true);

    console.log(values);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="ml-2">
            Chỉnh sửa trang cá nhân
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa trang cá nhân</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin tại đây. Nhấn "Lưu" để lưu thay đổi.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

              {/* <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Sinh nhật</FormLabel>
                    <FormControl>
                      <Input placeholder="example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
