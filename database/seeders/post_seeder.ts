import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PostFactory } from '#database/factories/post_factory'

export default class extends BaseSeeder {
  async run() {
    await PostFactory.createMany(50)
  }
}