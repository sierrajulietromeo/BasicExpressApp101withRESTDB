import express from 'express';
const app = express();
import axios from 'axios';



app.set('view engine', 'pug'); // Set the view engine to Pug
app.use(express.urlencoded({ extended: true })); // Set up middleware for parsing POST requests
app.use(express.static('public')); // Serve static files from the 'public' directory

//new
app.use(express.json());

//new
import databaseAPI from './model/database.js';



app.get('/', function (req, res) {
  res.render('index'); // Render the 'index' Pug template instead of sending raw HTML
});

app.get('/steve', function (req, res) {
  res.send('Hello Steve'); // Send a string to the page.
});

app.get('/chuck-norris', async function(req, res) {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const joke = response.data.value;
    const icon_url = response.data.icon_url;
    res.render('chuck-norris', { joke, icon_url }); // Pass the joke and the icon URL to the Pug template
  } catch (error) {
    res.status(500).send("Error fetching Chuck Norris joke");
  }
});


// Route for rendering the list of names in descending order
app.get('/list', async (req, res) => {
  try {
    const items = await databaseAPI.read();
    res.render('list', { items });
  } catch (error) {
    console.error('Error fetching names:', error.message);
    res.status(500).send('Error fetching names');
  }
});



app.get('/add-name', function(req, res) {
  res.render('add-name');
});


app.post('/add-name', async function(req, res) {
  const name = req.body.name.trim(); // Trim whitespace from both ends of the string
  if (name) { // Check if 'name' is not empty after trimming
    // Proceed with inserting the name into the REST database
    try {
      await databaseAPI.write({ name });
      res.redirect('/list'); // Redirect to the list of names after insertion
    } catch (error) {
      // Handle the error by sending an error message or status code
      res.status(500).send("Error adding the name to the database");
    }
  } else {
    res.render('add-name', { error: 'Name cannot be empty.' });
  }
});



app.get('/delete-name/:id', async function(req, res) {
  const id = req.params.id;
  try {
    await databaseAPI.delete(id);
    res.redirect('/list'); // Redirect to the list of names after deletion
  } catch (error) {
    console.error('Error deleting name:', error.message);
    res.status(500).send('Error deleting name');
  }
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});