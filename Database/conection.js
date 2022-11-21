const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://milena:milena@cluster0.3sd0vrq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log(err);
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

