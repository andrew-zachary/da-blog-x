import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import string from '@adonisjs/core/helpers/string'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {

    const title = faker.lorem.words(3)
    const slug = string.slug(title)
    const description = faker.lorem.paragraph(1)
    const body = faker.lorem.paragraph(5)

    return { title, slug, description, body }
  })
  .build()