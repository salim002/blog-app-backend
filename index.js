import express from "express";
const app = express();
const PORT = 9000;
import cors from "cors";

import connectToMongo from './config/db.js';
import authRoutes from './routes/blog.js';

connectToMongo();

app.use(express.json());
app.use(cors());

app.use(express.static("public/upload"));

app.get("/", (req, res)=>{
    res.send("API is running");
});

// API Routes
app.use('/api/v1', authRoutes);



app.listen(PORT, ()=>{
    console.log(`API is running on http://localhost:${PORT}`);
})