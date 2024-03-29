import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title:string

  @column()
  declare slug:string

  @column()
  declare description:string

  @column()
  declare body:string

  @column()
  declare categoryId:number

  @column()
  declare userId:number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}