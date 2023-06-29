// Run command below in browser to Get news and store to MongoDB
// Save API Date to MongoDB: http://localhost:3000/getNews?title=<your-news-title> 
// Test sample "http://localhost:3000/getNews?title=technology"

const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');

const apikey = '176966c5545a4c1092a1a049fba778e9';

// Get news
app.get('/getNews', (req, res) => {
  const title = req.query.title;
  const querystr = `https://newsapi.org/v2/everything?q=${title}&sortBy=publishedAt&apiKey=${apikey}`;
  axios
    .get(querystr)
    .then((response) => {
      const author = response.data.articles[0].author;
      const title = response.data.articles[0].title;
      const description = response.data.articles[0].description;
      const url = response.data.articles[0].url;

      const newsValue = new Record({
        newsAuthor: author,
        newsTitle: title,
        newsDescription: description,
        newsUrl: url,
      });

      newsValue
        .save()
        .then((result) => {
          console.log('Success: ' + result);
        })
        .catch((error) => {
          console.log('Error saving record: ' + error);
        });

      res.send(`
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
          <h1 style="font-size: 28px; margin-bottom: 10px; color: #333333;">${author}</h1>
          <h2 style="font-size: 24px; margin-bottom: 10px; color: #007bff;">${title}</h2>
          <p style="margin-bottom: 10px; color: #666666;">${description}</p>
          <a href="${url}" style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Read more</a>
          <p style="margin-top: 10px; color: #666666;">Record saved</p>
        </div>
      `);
    })
    .catch((error) => {
      console.log('Error fetching news: ' + error);
      res.status(500).send('Error occurred while fetching news');
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
