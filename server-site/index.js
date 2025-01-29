const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;


// MiddleWare ============
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://vitalcamp.netlify.app']
}))

// MongoDB Working =======================

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xfij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("vitalCamp").collection("users");
    const campCollection = client.db("vitalCamp").collection("allCamps");
    const regiCollection = client.db("vitalCamp").collection("regiCamps");
    const feedbackCollection = client.db("vitalCamp").collection("feedbacks");
    const notifyCollection = client.db("vitalCamp").collection("notifications");
    const paymentCollection = client.db("vitalCamp").collection("payments");


     // jwt related Api ===============
     app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      res.send({ token });
    });
    // Verify Token middleWare ============
     const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Forbidden Access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res.status(401).send({ message: "unauthorized access" });
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    }
    // Verify Admin =============
    const verifyAdmin = async(req, res,next) => {
      const email = req?.decoded?.email
      const query = {email: email}
      const user = await userCollection.findOne(query)
      const isAdmin  = user?.role === 'admin'
      if(!isAdmin){
        return res.status(403).send({message: 'forbidden access'})
      }
      next()
    }

    // New user Database Collection ==================
    app.post("/users/:email", async (req, res) => {
      const email = req.params?.email;
      // Check user =========
      const filter = { email };
      const isExist = await userCollection.findOne(filter);
      if (isExist) return res.send(isExist);
      const userInfo = req.body;
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // Check user Role =====================
    app.get("/users/admin/:email", async (req, res) => {
      try{
        const email = req.params?.email;
        const query = { email };
        const user = await userCollection.findOne(query);
        let admin = false;
        if (user) {
          admin = user?.role === "admin";
        }
        res.send({ admin });
      }
      catch(error){
        console.log(error.message);
      }
    });
    // Add camp information =================
    app.post("/addCamp",verifyToken,verifyAdmin, async (req, res) => {
      const campData = req.body;
      const result = await campCollection.insertOne(campData);
      res.send(result);
    });
   
    // All camps data fetch =========
    app.get("/allCamps", async (req, res) => {
      const {category,search} = req.query
      let query = {}
      if (search) {
        const numericSearch = parseFloat(search);
        query.$or = [
          { campName: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { dateTime: { $regex: search, $options: 'i' } },
          { healthCareName: { $regex: search, $options: "i" } },
          { campFees: { $gte: numericSearch, $lte: numericSearch + 50 } } 
        ];
      }
      let sortOptions = {}
      if(category === "campName"){
        sortOptions = { campName: 1 };
      }
      else if(category === "campFees"){
        sortOptions = { campFees: 1 };
      }
      else if(category === "mostRegistered"){
        sortOptions = { participantCount: -1 };
      }
      const result = await campCollection.find(query).sort(sortOptions).toArray();
      res.send(result);
    });

    // Admin All Camps 
    app.get("/adminAllCamps", async (req, res) => {
      const { search } = req.query;
      const page = parseInt(req.query.page) || 0
      const size = parseInt(req.query.size) || 10

      let query = {};
      if (search) {
        query = {
          $or: [
            { campName: { $regex: search, $options: "i" } },
            { healthCareName: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { dateTime: { $regex: search, $options: "i" } },
          ],
        };
      }
      const result = await campCollection.find(query).toArray();
      res.send(result);
    });
    // Delete Camp item admin ===================
    app.delete("/allCamps/:id", verifyToken,verifyAdmin, async (req, res) => {
      const id = req.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await campCollection.deleteOne(query);
      res.send(result);
    });
    // Update camp Data  admin 
    app.put("/updateCamp/:id",verifyToken,verifyAdmin, async (req, res) => {
      const campInfo = req.body;
      const id = req.params?.id;
      try {
        const query = { _id: new ObjectId(id) };
        const updateInfo = {
          $set: {
            campName: campInfo?.campName,
            image: campInfo?.image,
            campFees: campInfo?.campFees,
            dateTime: campInfo?.dateTime,
            location: campInfo?.location,
            healthCareName: campInfo?.healthCareName,
            description: campInfo?.description,
          },
        };
        const options = {upsert: true}
        const result = await campCollection.updateOne(
          query,
          updateInfo,
          options
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating camp:", error);
        res.status(500).send({ error: "Failed to update camp" });
      }
    });
    // Get Single Item ===============
    app.get("/updateCamp/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campCollection.findOne(query);
      res.send(result);
    });

    // update participant count 
    app.patch('/updateCount/:id', async(req,res)=>{
      const id = req.params?.id;
      const query = { _id: new ObjectId(id) };
      const updateInfo = {
        $inc: {
          participantCount: 1
        }
      }
      const result = await campCollection.updateOne(query,updateInfo)
      res.send(result)
    })

    // details camp data get =========
    app.get('/details/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await campCollection.findOne(filter)
      res.send(result)
    })

    // Post RegiCamps collection user ===============
    app.post('/regiCamps/:email',verifyToken, async (req, res) => {
      const email = req.params?.email
      const regiCampData = req.body 
      const {campId} = regiCampData;
      const query = {
        campId: campId,
        participantEmail: email
      }
      const isExist = await regiCollection.findOne(query)
      if(isExist){
        return res.send({message: 'This Camp is already exist'})
      }
      const result = await regiCollection.insertOne(regiCampData)
      res.send(result)
    })

    // All registerCamps Data 
    app.get('/regiCamps', async (req, res) => {
      const { search } = req.query;
      let query = {};
      if (search) {
        const numericSearch = parseFloat(search);
        query = {
          $or: [
            { campName: { $regex: search, $options: "i" } },
            { participantName: { $regex: search, $options: "i" } },
            { campFees: { $gte: numericSearch, $lte: numericSearch + 50 } } 
          ],
        };
      }

      try {
        const result = await regiCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching registered camps:', error);
        res.status(500).send({ error: 'An error occurred while fetching registered camps.' });
      }
    });
    // Register Camps with specific user =======
    app.get('/regiCamps/:email', async (req, res) => {
      const email = req.params?.email;
      const { search } = req.query;     
      let filter = { participantEmail: email };

      if (search) {
        filter = {
          ...filter, 
          $or: [
            { campName: { $regex: search, $options: "i" } },
            { participantName: { $regex: search, $options: "i" } },
            { confirmationStatus: { $regex: search, $options: "i" } },
          ]
        };
      }
        const result = await regiCollection.find(filter).toArray();
        res.send(result);
    });
    
    // update Regicamp data admin =================
    app.patch('/regiCamp/:id',verifyToken,verifyAdmin, async(req, res) => {
      const id = req.params?.id
      const statusInfo = req.body
      const query = {_id: new ObjectId(id)}
      const updateInfo = {
        $set: {confirmationStatus: statusInfo?.confirmationStatus}
      }
      try{
        const result = await regiCollection.updateOne(query,updateInfo)
        res.send(result)
      }
      catch(err) {
        res.status(404).send({message: err.message})
      }
    })
   
    // Delete RegiCamp Item By Admin and user  =================
    app.delete('/regiCamp/:id',verifyToken, async(req, res) => {
      try{
        const id = req.params?.id
        const filter = {_id: new ObjectId(id)}
        const result = await regiCollection.deleteOne(filter)
        res.send(result)
      }
      catch (err) {
        console.log(err.message);
      }
    })
    // Notification send from admin delete hit ============
    app.post('/notification',verifyToken, async (req, res) => {
      const notificationData = req.body 
      const result = await notifyCollection.insertOne(notificationData)
      res.send(result)
    })

     // Notification send from admin get ============
     app.get('/notification/:email', async (req, res) => {
      const email = req.params?.email 
      const query = {participantEmail: email}
      const result = await notifyCollection.find(query).toArray()
      res.send(result)
    })

    // Post Participant Feedback =============
    app.post('/feedbacks',verifyToken, async(req,res)=>{
      const feedBackData = req.body 
      const result = await feedbackCollection.insertOne(feedBackData)
      res.send(result)
    })
    // Get All Feedback Data =================
    app.get('/feedbacks', async(req,res)=>{
      const result = await feedbackCollection.find().toArray() 
      res.send(result)
    })


    // Payment Method Intent ==================
    app.post('/create-payment-intent', async (req, res) => {
      const {price} = req.body 
      const amount = parseInt(price*100) 

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      })
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    // Payment History Post ===================
    app.post('/payments' ,verifyToken, async(req, res)=>{
      const paymentInfo = req.body 
      const result = await paymentCollection.insertOne(paymentInfo)
      res.send( result)
    })

    // Payment History Get with specific user =======
    app.get('/payments/:email',verifyToken, async(req, res)=>{
      const email = req.params?.email 
      const filter  = {email: email}
      const result = await paymentCollection.find(filter).toArray()
      res.send( result)
    })

    // Payment status update from user =========================
    app.patch('/payments/:id',verifyToken, async(req, res) => {
      const id = req.params?.id
      const statusInfo = req.body
      const query = {_id: new ObjectId(id)}
      const updateInfo = {
        $set: {paymentStatus: statusInfo?.paymentStatus}
      }
      try{
        const result = await regiCollection.updateOne(query,updateInfo)
        res.send(result)
      }
      catch(err) {
        res.status(404).send({message: err.message})
      }
    })
    // confirmation status update from admin for paymentHistory =============
    app.patch('/paymentHistory/:id',verifyToken, async(req,res) => {
      const id = req.params?.id 
      const statusInfo = req.body
      const query = { paymentId: id }
      const updateInfo = {
        $set: {confirmationStatus: statusInfo?.confirmationStatus}
      }
      const result = await paymentCollection.updateOne(query, updateInfo)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The Server Is Running");
});
app.listen(port, () => {
  console.log("This Server is listening on port", port);
});
