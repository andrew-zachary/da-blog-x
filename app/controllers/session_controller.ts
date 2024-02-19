import User from '#models/user'
import { loginUserValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

    async create({ view }:HttpContext) {

        return view.render('pages/login')
    }

    async store({ request, auth, response }:HttpContext) {

        const { email, password } = request.body()
        await request.validateUsing(loginUserValidator)
        const user = await User.verifyCredentials(email, password)
        await auth.use('web').login(user)
        return response.redirect('/dashboard')
    }

    async destroy({ auth, response }:HttpContext) {
        
        await auth.use('web').logout()
        return response.redirect('/')
    }
}