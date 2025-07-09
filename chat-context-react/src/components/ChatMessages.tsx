import { useChat } from "@/contexts/ChatContext";
import { useUser } from "@/contexts/UserContext";

export const ChatMessages = () => {
	const chatCtx = useChat();
	const userCtx = useUser();

	return (
		<div className="flex flex-col gap-1">
			{chatCtx.chat.map((item) => (
                <div
                    key={item.id}
                    className={`border border-white/20 p-2 rounded-md text-sm
                       ${userCtx.user === item.user
                        ? 'self-end bg-white/10 text-right'
                        : 'self-start bg-white/5 text-left'
                    }`}
                >
                    <div className="font-bold">{item.user}</div>
                    <p>{item.text}</p>
                </div>
			))}
		</div>
	);
};
