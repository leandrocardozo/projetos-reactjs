import { createContext, ReactNode, useContext, useState } from "react";

type ContextUserType = {
    user: string;
    setUser: (newUser: string) => void;
}
export const UserContext = createContext<ContextUserType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState('');
    return (
        <UserContext.Provider value={ { user, setUser } }>
            { children }
        </UserContext.Provider>
    );
}

// export const useUser = () => useContext(UserContext);

// Hook customizado para acessar o UserContext.
// Lança erro se for usado fora do UserProvider.
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser não pode ser usado sem o UserProvider");
    }
    return context;
}