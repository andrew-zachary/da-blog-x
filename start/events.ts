import emitter from '@adonisjs/core/services/emitter'
import db from '@adonisjs/lucid/services/db'

emitter.on('db:query', db.prettyPrint)