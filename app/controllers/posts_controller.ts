import Post from '#models/post'
import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {

    async index({ view, request }:HttpContext) {

        const page = request.input('page', 1)
        const limit = 10

        const data = await Post.query().preload('category').paginate(page, limit)
        if(!data.hasMorePages) throw errors.E_COMMAND_NOT_FOUND

        return view.render('pages/posts', { data })
    }
}