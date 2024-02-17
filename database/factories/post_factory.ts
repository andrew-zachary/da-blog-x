import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import string from '@adonisjs/core/helpers/string'
import { CategoryFactory } from './category_factory.js'
import { UserFactory } from './user_factory.js'

let loopNum = 1
let categoryId = 0
let userId = 0

export const PostFactory = factory
  .define(Post, async ({ faker }) => {

    const title = faker.lorem.words(3)
    const slug = string.slug(title)
    const description = faker.lorem.paragraph(1)
    const body = faker.lorem.paragraph(5)
    
    if([1, 11, 21, 31, 41].includes(loopNum)) {

      categoryId = (await CategoryFactory.create()).id
      userId = (await UserFactory.create()).id
    }

    loopNum++

    return { title, slug, description, body, categoryId, userId }
  })
  .build()