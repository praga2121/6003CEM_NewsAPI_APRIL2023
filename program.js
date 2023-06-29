const axios = require('axios');

const apikey = 'e1928d8e81824e838da111571e75f9f7';
const title = 'Technology';


const querystr = `https://newsapi.org/v2/everything?q=${title}&sortBy=publishedAt&apiKey=${apikey}`;  

axios.get(querystr).then((response)=>{
    console.log(response.data.articles[0].source.name);
    console.log(response.data.articles[0].author);
    console.log(response.data.articles[0].title);
    console.log(response.data.articles[0].description);
    console.log(response.data.articles[0].url);
    console.log(response.data.articles[0].urlToImage);
    console.log(response.data.articles[0].publishedAt)
});
