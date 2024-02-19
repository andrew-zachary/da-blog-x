import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(

    vine.object({
        email: vine.string().email().trim(),
        password: vine.string()
    })
)