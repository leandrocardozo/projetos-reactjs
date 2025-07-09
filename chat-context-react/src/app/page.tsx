"use client";

import { Chat } from "@/components/Chat";
import { ChatProvider } from "@/contexts/ChatContext";
import { UserProvider } from "@/contexts/UserContext";

const Page = () => {
	return (
		<div className="max-w-lg container mx-auto px-2">
			<UserProvider>
				<ChatProvider>
                    <h1 className="text-3xl my-3 text-center">Chat simples</h1>
                    <Chat/>
				</ChatProvider>
			</UserProvider>
		</div>
	);
};

export default Page;
