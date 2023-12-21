import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import PropTypes from 'prop-types'
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email: userEmail}
            setUser(currentUser)
            if(currentUser){
                axiosPublic.post('/jwt', loggedUser, {withCredentials: true})
                .then(res =>{
                    console.log('token res: ', res.data)
                    setLoading(false)
                })
            }
            else{
                axiosPublic.get('/jwt/logout', {withCredentials: true})
                .then(res =>{
                    console.log('token cleared: ', res.data)
                    setLoading(false)
                })
            }
        })
        return () =>{
            return unsubscribe()
        }
    },[user?.email, axiosPublic])


    const authInfo = {
        user, loading, createUser, logIn, googleSignIn, logOut, updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}