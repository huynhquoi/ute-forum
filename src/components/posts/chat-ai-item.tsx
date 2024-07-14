'use client'

import React from 'react';
import ReactMarkdown from 'react-markdown';

import './styles.scss'
import { Card } from '../ui/card';

interface ChatAIItemProps {
    content: string;
}

const ChatAIItem: React.FC<ChatAIItemProps> = ({ content }) => {
    return (
        <>
            <Card className='p-4 bg-gray-50 border shadow-none ml-10 my-1'>
                <ReactMarkdown>{content}</ReactMarkdown>
            </Card>
        </>
    )
}

export default ChatAIItem