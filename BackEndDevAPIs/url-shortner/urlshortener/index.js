require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const dns = require('dns');
const urlparser = require('url');
const { error } = require('console');

const client = new MongoClient(process.env.MONGO_URL)
const db = client.db("urlshortner");
const urls = db.collection("urls");


// Basic Configuration
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  console.log(req.body)
  const url = req.body.url
  const dnsLookup = dns.lookup(urlparser.parse(url).hostname, async (error, address) => {
    if(!address) return res.json({error: "Invalid URL"});
    const count = await urls.countDocuments({});
    const urlDoc = {
      url: url,
      short_url: count
    }

    const result = await urls.insertOne(urlDoc);
    console.log(result);
    res.json({ original_url: url, short_url: count})
  })
});

app.get('/api/shorturl/:shorturl', async (req, res) => {
  const shorturl = parseInt(req.params.short_url);
  const urlDoc = await urls.findOne({ short_url: +shorturl })

  if (!urlDoc) {
    return res.json({ error: "Short URL not found" });
  }

  res.redirect(urlDoc.url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
