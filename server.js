import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';
import isSignedIn from './middleware/is-signed-in.js';
import passUserToView from './middleware/pass-user-to-view.js';
import User from './models/user.js';
import authController from './controllers/auth.js';
import entriesController from './controllers/entries.js';
const port = process.env.PORT ? process.env.PORT : '3000';

const app = express()

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});


//missing code for users/foods to coordinate with error on page 

app.get('/users', async(req, res) => {
  const users = await User.find()//get all user from the data base 
  res.render('users/index.ejs', {users: users})
})

// app.get('/users/:userid/foods', async(req, res) => {
//   res.render('foods/index.ejs')
// })

app.get('/users/show/:id', async(req,res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch the user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('users/show.ejs', { user: user }); // Pass the user to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})


app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/entries', entriesController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});




  
