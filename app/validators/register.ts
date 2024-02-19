import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(

    vine.object({
        username: vine.string().trim(),
        email: vine.string().email().trim(),
        password: vine.string()
    })
)