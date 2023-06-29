const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);

const db = "mongodb+srv://dbUser:hBm7DW0qmCkwW7sC@gettingstarted.olbilem.mongodb.net/sample_airbnb"

mongoose.connect(db).then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("Can't connect to database");
}
)

/* 
// REF PURPOSE ONLY FOR PARAMS //
console.log(response.data.articles[0].source.name);
console.log(response.data.articles[0].author);
console.log(response.data.articles[0].title);
console.log(response.data.articles[0].description);
console.log(response.data.articles[0].url);
console.log(response.data.articles[0].urlToImage);
console.log(response.data.articles[0].publishedAt)

newsName: Name,
newsAuthor: Author,
newsTitle: Title,
newsDescription: Description,
newsUrl: Url,
newsImage: Image,
newsPublished: Published,
// REF PURPOSE ONLY FOR PARAMS //
*/

const newsSchema = new mongoose.Schema({
    newsName: {type: String},
    newsAuthor: {type: String},
    newsTitle: {type: String},
    newsDescription: {type: String},
    newsUrl: {type: String},
    newsImage: {type: String},
    newsPublished: {type: String},
});

const News = mongoose.model('news', newsSchema);

module.exports = News;

// ------ Required packages to be installed into the package.json ------ //
//   npm install express --save
//   npm install axios
//   npm install mongoose@6.10.0
//   npm install mongodb
//   npm install react
// ------ Required packages to be installed into the package.json ------ //