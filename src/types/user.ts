import { Card } from './card'

export interface UserGenericTypes {
    id: string
    name: string
    email: string
    password: string
}

export interface UserTypes {
    success: boolean
    code: number
    message?: string
}

export interface GetUserTypes {
    success: boolean
    code: number
    message?: string
    user: UserGenericTypes
}

export interface User {
    id: string
    name: string
    email: string
    password: string
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    description: string | null
    created_at: Date
    updatedAt: Date
    card: Card[]
}
