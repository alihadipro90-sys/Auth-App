import mongoose from "mongoose";
import dns from "node:dns"; 
import "colors";


dns.setServers(["1.1.1.1", "8.8.8.8"]);

// connection of teh database.
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connected ${conn.connection.host}`.bgYellow);
    } catch (error) {
        console.log(`error : ${error.message}`.bgRed);
        process.exit(1);
    }
};

export default connectDb;
