import Category from '#models/category'
import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

    async show({ view, request, params }:HttpContext) {

        const page = request.input('page', 1)
        const limit = 10

        const category = await Category.findBy('slug', params.slug)
        if(!category) throw errors.E_COMMAND_NOT_FOUND

        const data = await Category.query().where('id', category.id).preload('posts', postsQuery => {

            postsQuery.preload('user')
        }).paginate(page, limit)

        return view.render('categories', { data })
    }
}