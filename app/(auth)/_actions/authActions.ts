"use server"

type loginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const LoginAction = async(prevAction: loginState, formData: FormData) => {
    console.log(formData);
    const email = formData.get('email')
    const password = formData.get('password')

    const payload = {
        email, password
    }


    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json()

    console.log(result);

    return result
}