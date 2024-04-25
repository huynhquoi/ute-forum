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
  const [loginInfo, setLoginInfo] = useState<LoginType>({
    username: "",
    password: "",
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchData = async () => {
      try {
        const responseLogin = await loginApi(loginInfo);
        setLoading(false);
        setItem("userId", responseLogin.id);
        router.push("/home");
      } catch (error: any) {
        setLoading(false);
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [loading, loginInfo, router, setItem]);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setLoginInfo(values);
    setLoading(true);
  };
  return (
    <>
      <Card className="w-[600px]">
        <CardHeader>
          <h2 className="text-2xl font-bold">Đăng nhập</h2>
          <p>
            Đăng nhập vào tài khoản của bạn, hoặc bắt đầu với{" "}
            <Link className="font-bold" href={"register"}>
              đăng ký tài khoản
            </Link>
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
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
