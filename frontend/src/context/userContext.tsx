'use client';
import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

interface UserContext {
    accountType: 'ADMIN' | 'VOLUNTEER' | '';
    setAccountType: (accountType: UserContext['accountType']) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}

interface UserProviderProps extends PropsWithChildren {}

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const savedAccountType =
        typeof window !== 'undefined'
            ? (localStorage.getItem(
                  'accountType'
              ) as UserContext['accountType'])
            : '';

    const savedAccessToken =
        typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : '';

    const [accountType, setAccountType] =
        useState<UserContext['accountType']>(savedAccountType);

    const [accessToken, setAccessToken] = useState(savedAccessToken);

    return (
        <UserContext.Provider
            value={{
                accountType,
                setAccountType: (accountType) => {
                    setAccountType(accountType);
                    localStorage.setItem('accountType', accountType as string);
                },
                accessToken,
                setAccessToken: (accessToken) => {
                    setAccessToken(accessToken);
                    localStorage.setItem('accessToken', accessToken);
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUserContext must be used inside a UserProvider');
    }

    return context;
};
