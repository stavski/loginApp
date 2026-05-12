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
            const token = await SecureStore.getItemAsync('token');

            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setSigned(true);
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(credentials: object) {
        try {
            const response = await api.post('/sessions', credentials);
            const { token, refreshToken } = response.data;

            await SecureStore.setItemAsync('token', token);
            await SecureStore.setItemAsync('refreshToken', refreshToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setSigned(true);
        } catch (error) {
            throw error;
        }
    }

    function signOut() {
        SecureStore.deleteItemAsync('token');
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