import mongoose from 'mongoose';
import dns from 'node:dns';

const setCustomDnsIfConfigured = () => {
    const dnsServers = process.env.DNS_SERVERS?.split(',')
        .map((server) => server.trim())
        .filter(Boolean);

    if (!dnsServers?.length) return;

    const validServers = dnsServers.filter((server) => {
        const parts = server.split('.');
        if (parts.length !== 4) return false;
        return parts.every((part) => /^\d+$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
    });

    if (validServers.length) {
        dns.setServers(validServers);
    }
};

export const connectDB = async () => {
    try {
        setCustomDnsIfConfigured();
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error in connecting database:", error.message);
        throw error;
    }
};