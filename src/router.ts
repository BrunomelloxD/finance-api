import { Router } from 'express'

// CONTROLLERS - CARD
import CreateCardController from './controllers/card/CreateCardController'
import CreateSpendCreditCardController from './controllers/card/CreateSpendCreditCardController'
import GetAllCardsController from './controllers/card/GetAllCardsController'
// CONTROLLERS - USER
import AuthController from './controllers/user/AuthController'
import CreateUserController from './controllers/user/CreateUserController'
import GetAllUserController from './controllers/user/GetAllUserController'
import GetUserController from './controllers/user/GetUserController'

// MIDDLEWARES
import authMiddleware from './middlewares/authMiddleware'

const routes = Router()

routes.get('/user', GetAllUserController.handle)
routes.get('/user/:id', GetUserController.handle)
routes.get('/card/:id', GetAllCardsController.handle)
routes.post('/login', AuthController.authenticate)
routes.post('/card', authMiddleware, CreateCardController.handle)
routes.post('/user', CreateUserController.handle)
routes.post('/user', CreateUserController.handle)
routes.post('/card', authMiddleware, CreateSpendCreditCardController.handle)

export { routes }
