import { useUser } from "@/contexts/UserContext";
import { KeyboardEvent, useState } from "react";

export const UserInput = () => {
	const [nameInput, setNameInput] = useState("");
	const userCtx = useUser();

	const handleKeyUpAction = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code.toLowerCase() === "enter") {
			const trimmed = nameInput.trim();
            if (!trimmed || trimmed === "bot") return;
            
			userCtx.setUser(trimmed);
		}
	};

	return (
		<div className="mt-14">
			<p className="text-xl mb-4">Qual seu nome?</p>
			<div className="flex gap-3 items-center text-lg">
				<input
					type="text"
					placeholder="digite seu nome.."
					className="bg-white/10 border border-white/30 
                    outline-none rounded-md flex-1 px-4 py-3"
					value={nameInput}
					onChange={(e) => setNameInput(e.target.value)}
					onKeyUp={handleKeyUpAction}
				/>
			</div>
		</div>
	);
};
