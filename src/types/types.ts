import { User } from './user'
export interface ResponseGenericTypes {
    success: boolean
    code: number
    message?: string
    user?: User
}
