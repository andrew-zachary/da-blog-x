/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthorsController from '#controllers/authors_controller'
import CategoriesController from '#controllers/categories_controller'
import PostsController from '#controllers/posts_controller'
import SessionController from '#controllers/session_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home')
router.on('/about').render('pages/about')
router.on('/dashboard').render('pages/dashboard').use(middleware.auth())
router.get('/posts', [PostsController, 'index'])
router.get('/categories/:slug', [CategoriesController, 'show'])
router.get('/authors/:username', [AuthorsController, 'show'])
router.get('/register', [AuthorsController, 'create'])
router.post('/register', [AuthorsController, 'store'])
router.get('/login', [SessionController, 'create'])
router.post('/login', [SessionController, 'store'])
router.post('/logout', [SessionController, 'destroy'])
