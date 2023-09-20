interface SpendCreditCard {
    id: string
    value: number
    description: string
    created_at: Date
    updatedAt: Date
    userId: string
    cardId: string
}

interface SpendDebitCard {
    id: string
    value: number
    description: string
    created_at: Date
    updatedAt: Date
    userId: string
    cardId: string
}

export interface Card {
    id: string
    name: string
    final_code: number
    created_at: Date
    updatedAt: Date
    userId: string
    spendCreditCards?: SpendCreditCard[]
    spendDebitCards?: SpendDebitCard[]
}
