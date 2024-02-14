import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class PostsController {

    async index({ view, request }:HttpContext) {

        const page = request.input('page', 1)
        const limit = 10

        const data = await db.from('posts').paginate(page, limit)
        console.log(data)

        return view.render('pages/posts', { data })
    }
}