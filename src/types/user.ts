import { Card } from './card'

export interface UserBasicTypes {
    id: string
    name: string
    email: string
    password: string
}

export interface UserTypes {
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
