import { z } from "zod";
import { Input } from "../ui/input";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useGetGroupByKeywordQuery, useGetUserByKeywordQuery, User } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";
import UserDisplay from "../users/user-display";
import { Loading } from "../svgs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SearchInputProps extends React.HtmlHTMLAttributes<HTMLDivElement> { }

const SearchSchema = z.object({
    keyword: z.string().min(1),
});

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
    const router = useRouter();
    const { user: auth } = useUserStorage()
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [debouncedInputValue, setDebouncedInputValue] = useState("");

    const { data: userData, loading: userLoading, refetch: refetchUsers } = useGetUserByKeywordQuery({
        variables: {
            keyword: debouncedInputValue,
            userid: auth?.userid
        },
        skip: !open || !debouncedInputValue,
    })

    const { data: groupData, loading: groupLoading, refetch: refetchGroups } = useGetGroupByKeywordQuery({
        variables: {
            keyword: debouncedInputValue,
            userid: auth?.userid
        },
        skip: !open || !debouncedInputValue,
    })

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
    });

    const onSubmit = (values: z.infer<typeof SearchSchema>) => {
        router.push(`/home/${values.keyword}`);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 1000);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        if (open && debouncedInputValue) {
            refetchUsers();
            refetchGroups();
        }
    }, [open, debouncedInputValue, refetchUsers, refetchGroups]);

    useEffect(() => {
        if (!open) {
            setDebouncedInputValue("");
            setInputValue("");
        }
    }, [open]);

    const loading = userLoading || groupLoading;

    return (
        <div {...props} ref={dropdownRef}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="keyword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Tìm kiếm"
                                        {...field}
                                        value={inputValue}
                                        onFocus={() => setOpen(true)}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            field.onChange(e);
                                            setOpen(true);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            {open && debouncedInputValue && (
                <div className="absolute bg-white border border-gray-200 mt-2 w-[400px] rounded-md p-2 space-y-2">
                    <div
                        className="p-2 py-4 cursor-pointer hover:bg-gray-100 rounded-md"
                        onClick={() => {
                            setOpen(false);
                            router.push(`/home/${inputValue}`);
                        }}
                    >
                        {inputValue}
                    </div>
                    {userData?.get_user_by_keyword?.map((u, index) => (
                        <Link href={`/profile/${u?.userid}`} key={index} className="hover:bg-gray-100 cursor-pointer p-2 rounded-md flex items-center">
                            <Avatar>
                                <AvatarImage src={u?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                                <p className="font-bold">{u?.fullname}</p>
                            </div>
                        </Link>
                    ))}

                    {groupData?.find_group_by_keyword?.map((g, index) => (
                        <Link href={`/forum/${g?.groupid}`} key={index} className="hover:bg-gray-100 cursor-pointer p-2 rounded-md flex items-center">
                            <Avatar>
                                <AvatarImage src={g?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                                <p className="font-bold">{g?.groupname}</p>
                                <p className="text-sm">Trưởng nhóm: <span className="font-bold">{g?.user_group?.fullname}</span></p>
                            </div>
                        </Link>
                    ))}

                    {loading && <div className="flex items-center justify-center mb-4"><Loading className="text-2xl animate-spin" /></div>}
                </div>
            )}
        </div>
    );
};

export default SearchInput;