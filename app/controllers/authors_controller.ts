import User from '#models/user'
import { registerUserValidator } from '#validators/register'
import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {

    async create({ view }:HttpContext) {

        return view.render('pages/register')
    }

    async store({ request, auth, response }:HttpContext) {

        const {username, email, password} = request.body()
        await request.validateUsing(registerUserValidator)
        const user = await User.create({username, email, password})
        await auth.use('web').login(user)
        return response.redirect('/dashboard')
    }

    async show({ view, request, params }:HttpContext) {

        const page = request.input('page', 1)
        const limit = 10

        const author = await User.findBy('username', params.username)
        if(!author) throw errors.E_COMMAND_NOT_FOUND

        const data = await User.query().where('id', author.id).preload('posts', postsQuery => {

            postsQuery.preload('category')
        }).paginate(page, limit)

        return view.render('authors', { data })
    }
}