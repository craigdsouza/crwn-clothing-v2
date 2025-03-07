import { useState, createContext, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => { },
});


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // signOutUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => { 
            console.log("user object from firebase", user);  // this is the user object from firebase, logs when user logs in or logs out
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

