export interface ResponseAuthGenericTypes {
    success: boolean
    code: number
    message?: string
    user?: User
    access_token?: string
}

interface User {
    id: string
    name: string
    email: string
}
