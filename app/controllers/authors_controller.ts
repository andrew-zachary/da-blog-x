import User from '#models/user'
import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {

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