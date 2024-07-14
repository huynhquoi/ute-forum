import { z } from "zod";
import { Input } from "../ui/input";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGetGroupByKeywordQuery, useGetUserByKeywordQuery } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";
import { Loading, XIcon } from "../svgs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getHistory, deleteHistory } from "@/api/auth";
import { Button } from "../ui/button";

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
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

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

    const fetchSearchHistory = useCallback(() => {
        if (auth?.userid) {
            getHistory(auth.userid)
                .then(data => {
                    if (Array.isArray(data)) {
                        setSearchHistory(data);
                    } else {
                        console.error("Unexpected data format from getHistory:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching search history:", error);
                });
        }
    }, [auth?.userid]);

    const handleDeleteHistoryItem = async (keyword: string) => {
        if (auth?.userid) {
            try {
                await deleteHistory(auth.userid, keyword);
                fetchSearchHistory(); // Refresh the search history after deletion
            } catch (error) {
                console.error("Error deleting search history item:", error);
            }
        }
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
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        if (open && debouncedInputValue) {
            refetchUsers();
            refetchGroups();
        }
    }, [open, debouncedInputValue, refetchUsers, refetchGroups]);

    useEffect(() => {
        fetchSearchHistory();
    }, [fetchSearchHistory]);

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
            {open && (
                <div className="absolute bg-white border border-gray-200 mt-2 w-[400px] rounded-md p-2 space-y-2">
                    {inputValue && (
                        <div
                            className="p-2 py-4 cursor-pointer hover:bg-gray-100 rounded-md"
                            onClick={() => {
                                setOpen(false);
                                router.push(`/home/${inputValue}`);
                            }}
                        >
                            {inputValue}
                        </div>
                    )}
                    {!inputValue && searchHistory.map((item, index) => (
                        <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded-md flex justify-between items-center"
                        >
                            <span
                                onClick={() => {
                                    setInputValue(item);
                                    setOpen(false);
                                    router.push(`/home/${item}`);
                                }}
                            >
                                {item}
                            </span>
                            <Button
                                variant={'ghost'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteHistoryItem(item);
                                }}
                            >
                                <XIcon className='text-base' />
                            </Button>
                        </div>
                    ))}
                    {inputValue && userData?.get_user_by_keyword?.map((u, index) => (
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
                    {inputValue && groupData?.find_group_by_keyword?.map((g, index) => (
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