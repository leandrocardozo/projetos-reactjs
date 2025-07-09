import { useUser } from "@/contexts/UserContext";
import { UserInput } from "./UserInput";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

export const Chat = () => {

    // Passo 1: Saber o nome do usuário
    // Passo 2: Histórico de mensagens
    // Passo 3: Input de adicionar mensagens

    const userCtx = useUser();
    if (!userCtx) return;
    if(!userCtx.user) return <UserInput/>
    
    return (
        <div className="border border-white/30 rounded-md">
            <div className="h-96 p-3 overflow-y-auto">
                <ChatMessages/>
            </div>
            <div className="border-t border-t-white/30 p-3">
                <ChatInput name={userCtx.user}/>
            </div>
            <div className="border-t border-t-white/30 p-3">
                <ChatInput name={"Atendente"}/>
            </div>
           
        </div>
    );
}