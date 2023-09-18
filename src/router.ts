import { Router } from 'express'

// CONTROLLERS - CARD
import CreateCardController from './controllers/card/CreateCardController'
import CreateSpendCreditCardController from './controllers/card/CreateSpendCreditCardController'
import CreateSpendDebitCardController from './controllers/card/CreateSpendDebitCardController'
import GetAllCardsController from './controllers/card/GetAllCardsController'
import GetCardController from './controllers/card/GetCardController'
// CONTROLLERS - USER
import AuthController from './controllers/user/auth/AuthController'
import CreateUserController from './controllers/user/CreateUserController'
import DeleteUserController from './controllers/user/DeleteUserController'
import ForgotPasswordController from './controllers/user/ForgotPasswordController'
import GetAllUserController from './controllers/user/GetAllUserController'
import GetUserController from './controllers/user/GetUserController'
import ResetPasswordController from './controllers/user/ResetPasswordController'

// MIDDLEWARES
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.get('/user', GetAllUserController.handle)
routes.get('/user/:id', authMiddleware, GetUserController.handle)
routes.get('/cards', authMiddleware, GetAllCardsController.handle)
routes.get('/card', authMiddleware, GetCardController.handle)
routes.post('/login', AuthController.authenticate)
routes.post('/card', authMiddleware, CreateCardController.handle)
routes.post('/user', CreateUserController.handle)
routes.delete('/user/:id', authMiddleware, DeleteUserController.handle)
routes.post(
    '/card/spend_credit_card',
    authMiddleware,
    CreateSpendCreditCardController.handle
)
routes.post(
    '/card/spend_debit_card',
    authMiddleware,
    CreateSpendDebitCardController.handle
)
routes.post('/user/forgot_password', ForgotPasswordController.handle)
routes.post('/user/reset_password', ResetPasswordController.handle)

export { routes }
