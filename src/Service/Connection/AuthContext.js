import React, { createContext, useState, useEffect } from 'react';
import auth from '../Connection/index';
import { getDatabase, ref, get, child } from 'firebase/database';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dbRef = ref(getDatabase());
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const authContextValue = {
    user,
    loading,
    login,
    logout,
  };

  useEffect(() => {
    if (user && user.uid) {
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.val());
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, dbRef]);

  return (
    <AuthContext.Provider value={{ ...authContextValue, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
