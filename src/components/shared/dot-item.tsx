"use client"

import * as React from "react"

interface DotItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    size?: number;
}

const DotItem: React.FC<DotItemProps> = ({ size, ...props }) => {
    return (
        <>
            <div {...props}></div>
        </>
    )
}

export default DotItem