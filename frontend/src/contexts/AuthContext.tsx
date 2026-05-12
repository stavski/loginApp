import { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/services/api';

interface AuthContextData {
    signed: boolean;
    signIn: (credentials: object) => Promise<void>;
    signOut: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const accessToken = await SecureStore.getItemAsync('accessToken');

            if (accessToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                setSigned(true);
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(credentials: object) {
        try {
            const response = await api.post('/auth/login', credentials);

            const { accessToken, refreshToken } = response.data;

            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', refreshToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            setSigned(true);
        } catch (error) {
            throw error;
        }
    }

    function signOut() {
        SecureStore.deleteItemAsync('accessToken');
        SecureStore.deleteItemAsync('refreshToken');
        setSigned(false);
    }

    return (
        <AuthContext.Provider value={{ signed, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);