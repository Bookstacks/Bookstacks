const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')

const Book = require('./db/models/book');
const Bluebird = require('bluebird')
const {User} = require('../server/db/models')

module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))
  app.use('/api/payment', require('./api/payment'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}


const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

// const syncDb = () => db.sync()

var books = [

  {
      title: "Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: ["Novel", "Historical Fiction"],
      price: 9,
      imageUrl: "/books/great_gatsby.jpeg",
      description: "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. First published in 1925, this quintessential novel of the Jazz Age has been acclaimed by generations of readers. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.",
      inventoryQuantity: 10
  },
  {
      title: "Infinite Jest",
      author: "David Foster Wallace",
      genre: ["Hysterical realism", "Satire", "Tragicomedy", "Post-postmodernism", "Encyclopedic novel"],
      price: 11,
      imageUrl: "/books/infinite_jest.jpg",
      description: "A gargantuan, mind-altering comedy about the pursuit of happiness in America. Set in an addicts' halfway house and a tennis academy, and featuring the most endearingly screwed-up family to come along in recent fiction, Infinite Jest explores essential questions about what entertainment is and why it has come to so dominate our lives; about how our desire for entertainment affects our need to connect with other people; and about what the pleasures we choose say about who we are. ",
      inventoryQuantity: 10
  },
  {
      title: "Ulysses",
      author: "James Joyce",
      genre: ["Novel", "Fiction"],
      price: 7,
      imageUrl: "/books/ulysses.jpg",
      description: "Ulysses is a novel by Irish writer James Joyce. It was first serialised in parts in the American journal The Little Review from March 1918 to December 1920, and then published in its entirety by Sylvia Beach in February 1922, in Paris. It is considered to be one of the most important works of Modernist literature, and has been called a demonstration and summation of the entire movement. Before Joyce, no writer of fiction had so foregrounded the process of thinking. However, even proponents of Ulysses such as Anthony Burgess have described the book as inimitable, and also possibly mad",
      inventoryQuantity: 10
  },
  {
      title: "1984",
      author: "George Orwell",
      genre: ["Utopian and dystopian fiction", "Social Science Fiction", "Political Fiction"],
      price: 5,
      imageUrl: "/books/1984.jpg",
      description: "Written in 1948, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...",
      inventoryQuantity: 10
  },
  {
      title: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      genre: ["Novel", "Magical Realism"],
      price: 13,
      imageUrl: "/books/hundred_years.jpg",
      description: "One of the twentieth century’s most beloved and acclaimed novels, One Hundred Years of Solitude tells the story of the rise and fall, birth and death of the mythical town of Macondo through the history of the Buendia family. Inventive, amusing, magnetic, sad, and alive with unforgettable men and women—brimming with truth, compassion, and a lyrical magic that strikes the soul—this novel is a masterpiece in the art of fiction.",
      inventoryQuantity: 10
  },
  {
    title: "In Search of Lost Time: Swann's Way",
    author: "Marcel Proust",
    genre: ["Modern Literature"],
    price: 14,
    imageUrl: "/books/in_search_of_lost_time.jpg",
    description: "In Swann's Way, the themes of Proust's masterpiece are introduced, and the narrator's childhood in Paris and Combray is recalled, most memorably in the evocation of the famous maternal good-night kiss. The recollection of the narrato'.s love for Swann's daughter Gilberte leads to an account of Swann's passion for Odette and the rise of the nouveaux riches Verdurins.",
    inventoryQuantity: 10
  },
  {
    title: "The Trial",
    author: "Franz Kafka",
    genre: ["Philosophical Fiction"],
    price: 10,
    imageUrl: "/books/the_trial.jpg",
    description: "The story of The Trial's publication is almost as fascinating as the novel itself. Kafka intended his parable of alienation in a mysterious bureaucracy to be burned, along with the rest of his diaries and manuscripts, after his death in 1924. Yet his friend Max Brod pressed forward to prepare The Trial and the rest of his papers for publication.",
    inventoryQuantity: 10
  },
  {
    title: "A Portrait of the Artist as a Young Man",
    author: "James Joyce",
    genre: ["Fiction"],
    price: 5,
    imageUrl: "/books/portrait.jpg",
    description: "Like much of James Joyce's work, A Portrait of the Artist as a Young Man is a fictional re-creation of the Irish writer's own life and early environment. The experiences of the novel's young hero, Stephen Dedalus, unfold in astonishingly vivid scenes that seem freshly recalled from life and provide a powerful portrait of the coming of age of a young man of unusual intelligence, sensitivity, and character.",
    inventoryQuantity: 10
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    genre: ["Existential novel"],
    price: 10,
    imageUrl: "/books/stranger.jpg",
    description: "Through the story of an ordinary man unwittingly drawn into a senseless murder on an Algerian beach, Camus explored what he termed the nakedness of man faced with the absurd. First published in 1946; now in a new translation by Matthew Ward.",
    inventoryQuantity: 10
  }
]

const syncDb = () => db.sync({force : true})
    .then(() => {
        return Bluebird.map(books, book => {
            return Book.create(book)
        })
    .then(()=>{
      return User.create({email: 'admin@admin.com', password: 'admin', admin:true})
    })
})


// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}










