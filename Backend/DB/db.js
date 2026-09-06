import mongoose from 'mongoose';
import dns from 'node:dns';

export const connectDB = async () => {
    try {
        const dnsServers = process.env.DNS_SERVERS?.split(',').map((server) => server.trim()).filter(Boolean);
        if (dnsServers?.length) dns.setServers(dnsServers);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error in connecting database : " + error.message);
    }
}