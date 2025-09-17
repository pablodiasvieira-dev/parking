import { app } from "./firebase"
import { 
    getAuth, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider, signOut,
    Auth,
    updateProfile
} from "firebase/auth"

const auth = getAuth(app)

export const createUserWithEmail = async (nome: string, email: string, password: string) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                updateProfile( result.user,
                    {displayName: nome}
                )
            })
        // senha minhaSENHA123
        return user
    } catch (error) {
        console.error(error)
    }
}

export const entrarComEmail = async (email: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        console.error(error)
    }
}

const providerGoogle = new GoogleAuthProvider()
export const entrarComGoogle = async () => {
    return await signInWithPopup(auth, providerGoogle)
}

export const deslogar = async (auth: Auth) => {
    return await signOut(auth)
}