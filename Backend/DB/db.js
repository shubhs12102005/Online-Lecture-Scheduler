import mongoose from 'mongoose';
import dns from 'node:dns';

const configureDns = () => {
    const dnsServers = process.env.DNS_SERVERS?.split(',')
        .map((server) => server.trim())
        .filter(Boolean);

    const validServers = dnsServers?.filter((server) => {
        const parts = server.split('.');
        if (parts.length !== 4) return false;
        return parts.every((part) => /^\d+$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
    });

    // Default to Google & Cloudflare DNS if none specified or invalid
    // This fixes querySrv ECONNREFUSED with MongoDB Atlas (mongodb+srv) on Windows/Node.js
    const serversToUse = validServers && validServers.length > 0 ? validServers : ['8.8.8.8', '8.8.4.4', '1.1.1.1'];

    try {
        dns.setServers(serversToUse);
    } catch (err) {
        console.warn("Could not set custom DNS servers:", err.message);
    }
};

export const connectDB = async () => {
    try {
        configureDns();
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("Initial database connection error:", error.message);
        try {
            console.log("Retrying MongoDB connection with public DNS fallback (8.8.8.8, 1.1.1.1)...");
            dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
            const retryConn = await mongoose.connect(process.env.MONGODB_URI);
            console.log(`MongoDB Connected Successfully on retry: ${retryConn.connection.host}`);
        } catch (retryError) {
            console.error("Failed to connect to MongoDB:", retryError.message);
            throw retryError;
        }
    }
};