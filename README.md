# Create a Blog web app using Adonis.js 6

Are you struggling to build Node.js web apps? Feeling lost in a sea of libs and tools?

Adonis.js to the rescue! :muscle::dizzy:

No need to spend hours finding and assembling dozens of packages together before you can write the first line of code.

## Content
- [Views - create pages and building blocks](#views)
- [Models - talk to the database](#models)
- [Controllers - add features to the app](#controllers)
- [Source Code](#source-code)

Designed as a feature-rich framework for building web applications in the Node.js ecosystem. Its well-written and intuitive documentation makes exploring and learning a truly enjoyable experience.

Laravel developers seeking a familiar yet performant Node.js framework, Adonis.js is a great choice for them to go through. It has its own:
- CLI tool - Ace.
- Template engine - Edgejs.
- ORM - Lucid.
- Validation library - VineJS.
- Built-in Authentication - sessions, API tokens, basic auth.

... and much more.

Within this post I would like to show you how I'm using Adonisjs to create a **Blog** web app.

Allow me to show you! :sunglasses::thumbsup:

Let's jump straight to **Ace** - the CLI-Tool of Adonis.js - and create a new app. There are several pre-configured starter kits to choose from. I will choose the Web starter kit and targeting **Postgres** DB.
```javascript 
npm init adonisjs@latest -- -K=web --db=postgres
```

Ace will now work its magic and set up everything we need to build our **Blog** web app.

Adonis in (MVC). The Model-View-Controller architectural pattern separates an application into three main components: the model, the view, and the controller. Let's talk about each one separately.

## Views

The `resources` directory is where I always start. It contains the **Edge** templates and the frontend code. Luckily, **Adonis.js** leverages <a href="https://vitejs.dev/">**Vite**</a>, a lightning-fast bundler that simplifies installing frontend development tools like <a href="https://tailwindcss.com/">**Tailwind**</a>. This saves us time and keeps our development/build workflow efficient.

![Adonis.js resources directory](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/avbpbr3plmtf8ws20afg.png)

I will create styled `header.edge` and `footer.edge` partials, along with `button.edge` and `input.edge` components. These will be my building blocks for creating all the web pages (views) I need:

```javascript
@include('partials/header')

...

<div class="flex justify-around">
  @!button({text: 'posts', href: '/posts', textSize: 'text-2xl'})
  @!button({text: 'about', href: '/about', textSize: 'text-2xl'})
</div>

...

@include('partials/footer')
```

Great! :raised_hands::raised_hands:

## Models

AdonisJS core team has created/maintains <a href="https://lucid.adonisjs.com/docs/introduction">**Lucid**</a>. It is a **SQL** query builder, and an <a href="https://en.wikipedia.org/wiki/Active_record_pattern">**Active Record ORM**</a> built on top of <a href="https://knexjs.org/">**Knex**</a>.

First, I will generate **Posts** database table by using migrations and model components. I also find using factories very helpful in filling the database tables with data quickly. So, let's create a **Post** model with its migration and factory components in one line:
```javascript
node ace make:model Post -fm
```
Second, within `app/models` directory let's modify the `post.ts` model file and add all the necessary props, such as title, slug, description, and the relationships with the other models like **Category** and **User**.

![Adonis.js app directory](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o7auaojbmwxoyk5oryfo.png)

Then, inside `database/migrations` directory I will edit the `123*_create_posts_table.ts` migration file and map the **Post** model's props to the database **Posts** table.

![Adonis.js database directory](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w9a0wdlf1apr6r8b9f4u.png)

I will use the **Post** factory component `post_factory.ts` to create some data:
```javascript
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
```

Finally, I need to push this **Post** factory to a **Post** seeder in order to do it's work. For that I will create a new seeder:
```javascript
node ace make:seeder Post
```

Here we go:
```javascript
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PostFactory } from '#database/factories/post_factory'

export default class extends BaseSeeder {
  async run() {
    await PostFactory.createMany(50)
  }
}
```

This seeder can run the model's factory. Let's run all the migration files and seed some data:
```javascript
node ace migration:run --seed
```

Remember, the migration files order is crucial. BTW for the **User** model, it's part of the Auth system built within Adonis.js and to configure the auth package let's type:
```javascript
node ace configure @adonisjs/auth --guard=session
```

AdonisJS ships with a robust and secure authentication system you can use to log in and authenticate users within the application.

## Controllers

Now my views and the database tables are ready. It is time to create controllers and add functions to my app.

I will create a **Post** controller for handling **CRUD** operations for the **Post** model such as indexing and creation:
```javascript
node ace make:controller posts
```
Within the controller I will add the methods I need, for example to index all the posts.

Finally, let's bind this controller to routes within the `start/routes.ts` file. This is how it looks like after binding all routes and controllers:
```javascript
import AuthorsController from '#controllers/authors_controller'
import CategoriesController from '#controllers/categories_controller'
import PostsController from '#controllers/posts_controller'
import SessionController from '#controllers/session_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home')
router.on('/dashboard').render('pages/dashboard').use(middleware.auth())
router.get('/posts', [PostsController, 'index'])
router.get('/categories/:slug', [CategoriesController, 'show'])
router.get('/authors/:username', [AuthorsController, 'show'])
router.get('/register', [AuthorsController, 'create'])
router.post('/register', [AuthorsController, 'store'])
router.get('/login', [SessionController, 'create'])
router.post('/login', [SessionController, 'store'])
router.post('/logout', [SessionController, 'destroy'])

```

Adonis.js 6 is amazing! Shoutout to the <a href="https://docs.adonisjs.com/guides/introduction">**docs**</a> for helping me wrap my head around it so quickly.