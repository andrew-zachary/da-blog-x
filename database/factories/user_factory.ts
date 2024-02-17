import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: '123456@1'
    }
  })
  .build()