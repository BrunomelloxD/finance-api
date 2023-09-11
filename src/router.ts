import { Router } from 'express'

// CONTROLLERS - CARD
import CreateCardController from './controllers/card/CreateCardController'
import CreateSpendCreditCardController from './controllers/card/CreateSpendCreditCardController'
import CreateSpendDebitCardController from './controllers/card/CreateSpendDebitCardController'
import GetAllCardsController from './controllers/card/GetAllCardsController'
import GetCardController from './controllers/card/GetCardController'
// CONTROLLERS - USER
import AuthController from './controllers/user/AuthController'
import CreateUserController from './controllers/user/CreateUserController'
import DeleteUserController from './controllers/user/DeleteUserController'
import GetAllUserController from './controllers/user/GetAllUserController'
import GetUserController from './controllers/user/GetUserController'

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
    '/card/spendCreditCard',
    authMiddleware,
    CreateSpendCreditCardController.handle
)
routes.post(
    '/card/spendDebitCard',
    authMiddleware,
    CreateSpendDebitCardController.handle
)

export { routes }
