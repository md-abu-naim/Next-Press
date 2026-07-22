/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import jwt from "jsonwebtoken"


const verifyToken = async (token: string, secret: string) => {
    try {
        const verifyToken = jwt.verify(token, secret)
        return {
            success: true,
            data: verifyToken
        }
    } catch (error: any) {
        console.log('Token verification failed', error);
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtUtils = {
     verifyToken
}