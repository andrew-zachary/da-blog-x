import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import stringHelpers from '@adonisjs/core/helpers/string'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {

    const name = faker.lorem.words(2)
    const slug = stringHelpers.slug(name)

    return { name, slug }
  })
  .build()