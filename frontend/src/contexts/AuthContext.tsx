import { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from "@/services/api";
import { User } from "@/types/user.types";

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn: (credentials: object) => Promise<void>;
    signOut: () => void;
    loading: boolean;
    updateUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [signed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadStorageData() {
            const storagedToken = await SecureStore.getItemAsync('accessToken');

            if (storagedToken) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;

                    const response = await api.get('/auth/me');

                    const userData = response.data.data ? response.data.data : response.data;

                    setUser(userData);

                } catch (error) {
                    signOut();
                }
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(credentials: object) {
        try {
            const response = await api.post('/auth/login', credentials);

            const { accessToken, refreshToken, user: userData } = response.data;

            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', refreshToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            setUser(userData);

        } catch (error) {
            throw error;
        }
    }

    async function signOut() {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');

            setUser(null);

        } catch (error) {
            console.error("Error during sign out:", error);
        }
    }

    function updateUser(newUser: User) {
        setUser(newUser);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut,
            loading,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);