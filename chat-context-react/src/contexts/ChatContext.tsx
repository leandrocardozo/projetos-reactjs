import { chatReducer } from "@/reducers/chatReducer";
import { Message } from "@/types/Message";
import { Children, createContext, ReactNode, useContext, useReducer } from "react";

type ChatContextType = {
    chat: Message[];
    addMessage: (user: string, text: string) => void;
};
export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chat, dispatch] = useReducer(chatReducer, []);

    const addMessage = (user: string, text: string) => {
        dispatch({
            type: 'add',
            payload: { user, text }
        });
    }

    return (
        <ChatContext.Provider value={ { chat, addMessage } }>
            { children }
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat não pode ser usado sem o ChatProvider")
    }
    return context;
}