const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');

const apikey = 'e1928d8e81824e838da111571e75f9f7';

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Set up HTML layout with CSS styling
const htmlLayout = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>News - RESTful API</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      h1 {
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
        color: #4CAF50;
        text-shadow: 2px 2px 5px #30d5c8;
      }

      h2 {
        margin-top: 30px;
        text-shadow: 2px 2px 5px red;
      }

      form {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 10px;
      }

      input[type="text"] {
        width: 300px;
        padding: 5px;
        margin-bottom: 10px;
      }

      input[type="submit"] {
        padding: 5px 10px;
      }

      .back-button {
        background-color: #424ef5;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }

      .news-section {
        margin-top: 30px;
        border: 1px solid #ccc;
        padding: 10px;
      }

      .news-section p {
        margin-bottom: 10px;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #f0f0f0;
        border-radius: 5px;
        padding: 20px;
      }

      .news-item {
        margin-bottom: 20px;
      }

      .news-item h3 {
        margin-top: 0;
        margin-bottom: 5px;
      }

      .news-item p {
        margin-top: 0;
        margin-bottom: 10px;
      }

      .news-item a {
        color: #0066cc;
        text-decoration: none;
      }
      .button {
        background-color: #424ef5;
        border: none;
        color: white;
        padding: 30px 52px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    </style>
    <script>
      function goBack() {
        window.history.back();
      }
    </script>
  </head>
  <body>
    <div class="container">
      <h1>News - RESTful API</h1>

      <div class="news-section">
        <h2>Add News</h2>
        <form action="/addNews" method="POST">
          <label for="author">Author:</label>
          <input type="text" name="author" id="author" required><br>
          <label for="title">Title:</label>
          <input type="text" name="title" id="title" required><br>
          <label for="description">Description:</label>
          <input type="text" name="description" id="description" required><br>
          <label for="url">URL:</label>
          <input type="text" name="url" id="url" required><br>
          <input type="submit" class="button" value="Add News">
        </form>
      </div>

      <div class="news-section">
        <h2>Delete News</h2>
        <form action="/deleteNews" method="POST">
          <label for="title">Title:</label>
          <input type="text" name="title" id="title" required><br>
          <input type="submit" class="button" value="Delete News">
        </form>
      </div>

      <div class="news-section">
        <h2>Get News</h2>
        <form action="/getNews" method="GET">
          <label for="title">Title:</label>
          <input type="text" name="title" id="title" required><br>
          <input type="submit" class="button" value="Get News">
        </form>
        <div id="news-result"></div>
      </div>
    </div>
  </body>
  </html>
`;

// Get news
app.get('/getNews', (req, res) => {
  const title = req.query.title;
  const querystr = `https://newsapi.org/v2/everything?q=${title}&sortBy=publishedAt&apiKey=${apikey}`;
  axios.get(querystr)
    .then((response) => {
      const author = response.data.articles[0].author;
      const newsTitle = response.data.articles[0].title;
      const description = response.data.articles[0].description;
      const url = response.data.articles[0].url;

      const newsValue = new Record({
        newsAuthor: author,
        newsTitle: newsTitle,
        newsDescription: description,
        newsUrl: url,
      });

      newsValue.save()
        .then(result => {
          console.log("Success" + result);
        })
        .catch(error => {
          console.log("Error" + error);
        });

      const newsHTML = `
       <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
          <h1 style="font-size: 28px; margin-bottom: 10px; color: #333333;">${author}</h1>
          <h2 style="font-size: 24px; margin-bottom: 10px; color: #007bff;">${title}</h2>
          <p style="margin-bottom: 10px; color: #666666;">${description}</p>
          <a href="${url}" style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Read more</a>
          <p style="margin-top: 10px; color: #666666;">Record saved</p>
        </div>
      `;

      res.send(`${newsHTML}<br>Record saved
                <button class="back-button" onclick="goBack()">Back</button>`);
    })
    .catch(error => {
      console.log("Error" + error);
      res.send('An error occurred while fetching news<br><button class="back-button" onclick="goBack()">Back</button>');
    });
});

// Post news
app.post('/addNews', (req, res) => {
  const { author, title, description, url } = req.body;

  const newsValue = new Record({
    newsAuthor: author,
    newsTitle: title,
    newsDescription: description,
    newsUrl: url,
  });

  newsValue.save()
    .then(result => {
      console.log("Success" + result);
      res.send('News added successfully<br><button class="back-button" onclick="goBack()">Back</button>');
    })
    .catch(error => {
      console.log("Error" + error);
      res.send('An error occurred while adding news<br><button class="back-button" onclick="goBack()">Back</button>');
    });
});

// Delete news
app.post('/deleteNews', (req, res) => {
  const title = req.body.title;
  console.log(title);
  Record.deleteOne({ newsTitle: title }, function (err) {
    if (err) return handleError(err);
    // Deleted at most one document
  });

  res.send(`${title} deleted<br><button class="back-button" onclick="goBack()">Back</button>`);
});

// Render HTML layout
app.get('/', (req, res) => {
  res.send(htmlLayout);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
