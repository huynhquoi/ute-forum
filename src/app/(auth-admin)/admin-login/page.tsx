"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { loginApi } from "@/api/auth";
import useStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/svgs";
import { useGetAccountByPkQuery, User } from "@/generated/types";
import { setCookie } from 'nookies';

const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6),
});

type LoginType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { setItem } = useStorage();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { data, fetchMore } = useGetAccountByPkQuery({
    variables: {
      userId: userId || "",
    },
    skip: !userId,
  });
  const [loginInfo, setLoginInfo] = useState<LoginType>({
    username: "",
    password: "",
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (userId && data?.find_account_by_id) {
      const user = data.find_account_by_id as User;
      setCookie(null, 'user', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setCookie(null, 'user_role', user.role?.roleid?.toString() || '', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push("/home");
    }
  }, [data, userId, router]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoginInfo(values);
    setLoading(true);

    try {
      const responseLogin = await loginApi(values);
      setLoading(false);
      setUserId(responseLogin.id);
      setCookie(null, 'userId', responseLogin.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setCookie(null, 'auth_token', responseLogin.accesstoken || '', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error: any) {
      setLoading(false);
      console.error(error.response?.data);
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">Đăng nhập</h2>
        <p>
          Admin page của Forum UTE
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Tên đăng nhập <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Mật khẩu <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="1234Aa@" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loading className="mr-2 h-4 w-4 animate-spin" /> : null}
              Đăng nhập
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
