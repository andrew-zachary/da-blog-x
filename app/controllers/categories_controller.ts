import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

    async show({ view, request, params }:HttpContext) {

        const page = request.input('page', 1)
        const limit = 10

        const category = await Category.findBy('slug', params.slug) || {id: 1}

        const data = await Category.query().where('id', category.id).preload('posts').paginate(page, limit)

        return view.render('categories', { data })
    }
}