import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

    async create({ view }:HttpContext) {

        return view.render('pages/login')
    }

    async store({ request, auth, response }:HttpContext) {

        const { email, password } = request.body()
        const user = await User.verifyCredentials(email, password)
        await auth.use('web').login(user)
        return response.redirect('/dashboard')
    }
}