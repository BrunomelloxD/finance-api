import { Card } from './card'
import { UserTypes } from './user'

export interface ResponseGenericTypes {
    success: boolean
    code: number
    message?: string
    user?: UserTypes
    cards?: Card[]
    card?: Card[]
}
