import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {

    async index({ view }:HttpContext) {

        return view.render('pages/posts', { posts: Array(10) })
    }
}