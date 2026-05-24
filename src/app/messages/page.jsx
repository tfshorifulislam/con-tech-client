import React from 'react'
import { FiMessageCircle } from 'react-icons/fi'


const MessagePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-3">
            
            <FiMessageCircle size={40} className="text-zinc-400" />

            <h1 className="text-2xl font-semibold">
                Messages coming soon
            </h1>

            <p className="text-zinc-500 text-sm">
                We’re working on real-time chat system
            </p>

        </div>
    )
}

export default MessagePage