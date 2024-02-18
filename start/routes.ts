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
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.get('/posts', [PostsController, 'index'])
router.get('/categories/:slug', [CategoriesController, 'show'])
router.get('/authors/:username', [AuthorsController, 'show'])
