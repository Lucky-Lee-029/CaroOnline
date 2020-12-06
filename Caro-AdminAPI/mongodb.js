
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:<Levanhai1999>@cluster0.hatjf.mongodb.net/<caromaster>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});
