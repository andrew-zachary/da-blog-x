import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'the {{ field }} is required',
  'string': 'the {{ field }} is required',
  'email': 'valid email address is required',

  // Error message for the username field
  'username.required': 'the user name is required'
})