import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieparser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import morgan from "morgan"; 
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';



const app = express();
const port = process.env.PORT || 4000
connectDB();

app.use(express.json());
app.use(cookieparser());
const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Origin is not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));

app.use("/api/hello", (req, res) => {
    res.json({message: "Hello from the server!"});
});

//API Endpoints
app.get("/", (req, res) => res.send("API Working Brilliantly!"));
app.use('/api/auth',authRouter)
app.use('/api/users', userRouter)

app.listen(port, () => console.log(`Server is running on port:${port}`.bgCyan.white));

