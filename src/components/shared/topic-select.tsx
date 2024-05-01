"use client"

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useGetTopicQuery } from "@/generated/types"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"

type TopicSelectProps = {
  form: any,
  name: string,
  label: string,
  classname: string,
}

const TopicSelect = ({ form, name, label, classname }: TopicSelectProps) => {
  const { data, loading, fetchMore } = useGetTopicQuery()
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    classname,
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value.length
                    ? `${field.value.length} topic đã chọn`
                    : "Select topic"}
                  <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn(
              classname, "p-0"
            )}>
              <Command>
                <CommandInput placeholder="Search topic..." />
                <CommandList>
                  <CommandEmpty>No topic found.</CommandEmpty>
                  <CommandGroup>
                    {data?.topic?.map((topic) => (
                      <CommandItem
                        value={topic?.topicname?.toString()}
                        key={topic?.topicname}
                        onSelect={() => {
                          // form?.setValue(name, [topic?.topicid.toString()])
                          field.value?.filter((item: string) => item === topic?.topicid.toString()).length ? form?.setValue(name, field.value?.filter((item: string) => item !== topic?.topicid.toString())) : form?.setValue(name, [...field.value, topic?.topicid.toString()])
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value?.filter((item: string) => item === topic?.topicid.toString()).length
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {topic?.topicname}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {field.value.length ?
            <Card className="space-x-2 p-3">
              {field.value.map((item: string) => <Badge key={item}>{data?.topic?.filter((topic) => item === topic?.topicid.toString())[0]?.topicname}</Badge>)}
            </Card> : <></>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}


export default TopicSelect