const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require('web-push')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;
const vapidKeys = {                                                                               
   "subject" : "mailto:<agredajose7@gmail.com>",                                  
   "publicKey" : "BC4auUyTyASkAy-ir6di0RZirzu1dWkN-lu6z6S1Yd-rCVhyNgWykgcGxn33mZzui1RDt5s9sbefJszAUfxNXuQ",
   "privateKey" : "Bq9vytT8YPshpQReTLdUom2FDfqcuRqMbsxTSrlTLrk"                    
   } 

webpush.setVapidDetails(
  vapidKeys.subject,
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

console.log(vapidKeys.subject)

app.get("/", (req, res) => res.send("Hello World!"));

const dummyDb = { subscription: null }; //dummy in memory store

const saveToDatabase = async subscription => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  const subscription = req.body;
  await saveToDatabase(subscription); //Method to save the subscription to Database
  res.json({ message: "success" });
  console.log(dummyDb.subscription)
});

app.get("/log", (req, res) => res.json({db: dummyDb}))

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}

//route to test send notification
app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
