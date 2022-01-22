import React from 'react';

export const AuthenticatedUserContext = React.createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};