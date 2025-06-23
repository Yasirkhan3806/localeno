import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'userData'),
            (snapshot) => {
                const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserData(users);

                const currentUid = auth.currentUser?.uid;
                if (currentUid) {
                    const matchedUser = users.find(user => user.userId === currentUid);
                    setCurrUser(matchedUser || null);
                } else {
                    setCurrUser(null);
                }

                setLoading(false);
            },
            (error) => {
                console.error('Error fetching userData:', error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ userData, currUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};