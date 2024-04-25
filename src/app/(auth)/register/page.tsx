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
import { checkCodeApi, registerApi, senMailApi } from "@/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(6),
});

type RegisterType = {
  fullname: string;
  email: string;
  username: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [checkCode, setCheckCode] = useState(false);
  const [validation, setValidation] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<RegisterType>({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchData = async () => {
      const response = await senMailApi({
        email: registerInfo?.email,
      })
        .then(() => {
          setLoading(false);
        })
        .finally(() => {
          setValidation(true);
        });
      console.log(response);
    };

    fetchData();
  }, [loading, registerInfo.email]);

  useEffect(() => {
    if (!checkCode) {
      return;
    }
    const fetchData = async () => {
      const response = await checkCodeApi({
        email: registerInfo?.email,
        code: code,
      });
      if (response === "Verify Success") {
        setRegister(true);
      }
    };
    fetchData();
  }, [checkCode, registerInfo?.email, code]);

  useEffect(() => {
    if (!register) {
      return;
    }
    const fetchData = async () => {
      try {
        await registerApi(registerInfo);
        router.push("/login");
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [register, registerInfo, router]);

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setRegisterInfo(values);
    setLoading(true);
  };
  return (
    <>
      <Card className="w-[600px]">
        {validation ? (
          <>
            <CardHeader>
              <div className=" flex flex-col items-center">
                <Image
                  src={"/check-circle-green.svg"}
                  alt="check"
                  width={72}
                  height={72}
                />
                <p className="mt-4">Vui lòng kiểm tra email của bạn</p>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Mã code bạn nhận được"
                type="text"
                onChange={(e: any) => {
                  setCode(e.target.value);
                }}
              />
              <Button
                className="w-full mt-2"
                onClick={() => setCheckCode(true)}
              >
                Xác nhận
              </Button>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
              <p>
                Nếu đã có tài khoản hãy{" "}
                <Link className="font-bold" href={"login"}>
                  đăng nhập
                </Link>
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Họ tên <span className="text-red-600">*</span>
                        </FormLabel>
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
                        <FormLabel className="font-bold">
                          Email <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
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
                          <Input
                            placeholder="1234Aa@"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    Đăng ký
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default RegisterPage;
