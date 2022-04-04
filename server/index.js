const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const brcrypt = require("bcrypt");
const cors = require("cors");
const PORT = 8000; 
const uri = "mongodb://127.0.0.1/tinderdb";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("home");
})

app.post("/signup", async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await brcrypt.hash(password, 10);
    
    try {
        await client.connect()
        const database = client.db("tinderdb")
        const users = database.collection("users")

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(409).send("Ok");
        }

        const data = {
            user_id: generatedUserId,
            email: email,
            hashedPassword: hashedPassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, email, {
            expiresIn: 60 * 24
        })

        res.status(201).json({ token , userId: generatedUserId, email: email })
         
    } catch (err){
        console.log(err);
    }
})

app.get("/users", async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db("tinderdb")
        const users = database.collection("users")

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally{
        await client.close()
    }
})

app.listen(PORT, () => console.log("Server is working"));

