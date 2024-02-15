import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import stringHelpers from '@adonisjs/core/helpers/string'
import { PostFactory } from './post_factory.js'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {

    const name = faker.lorem.words(2)
    const slug = stringHelpers.slug(name)

    return { name, slug }
  })
  .relation('posts', () => PostFactory)
  .build()