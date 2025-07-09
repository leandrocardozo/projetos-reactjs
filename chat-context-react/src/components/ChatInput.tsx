import { useChat } from "@/contexts/ChatContext";
import { KeyboardEvent, useState } from "react";

export const ChatInput = ({ name }: { name: string }) => {
    const [textInput, setTextInput] = useState('');
    const chatCtx = useChat();

    const handleKeyUpAction = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code.toLocaleLowerCase() === 'enter') {
            const trimmed = textInput.trim();
            if (!trimmed) return;

            chatCtx?.addMessage(name, trimmed);
            setTextInput('');
        }
    }
    return (
        <input
            placeholder={`${name}, digite uma mensagem (e aperte enter)`}
            className="w-full bg-transparent text-white text-md outline-none"
            value={textInput}
            onChange={event => setTextInput(event.target.value)}
            onKeyUp={handleKeyUpAction}

        />
    );
}