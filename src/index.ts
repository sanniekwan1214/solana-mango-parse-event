import { solanaProvider } from './solanaProvider'
import dotenv from 'dotenv';
import { Connection, PublicKey } from '@solana/web3.js';
import { createClient } from 'redis';
import { redisConnect } from './redisConnect';

// Setup the env config
dotenv.config();

// Setup and connect to Redis
const redisClient = createClient({
    url: process.env.REDIS_HOST && process.env.REDIS_POST? 
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_POST}`: 'redis://localhost:6379',
});
redisConnect(redisClient);

// Connect to RPC
const rpcUrl = process.env.RPC_URL;
const connection = new Connection(rpcUrl);

// Get the public key for the program account
const programId = new PublicKey(process.env.MANGO_ACC);

// Poll every 20(default) seconds due to rate limit
setInterval(async () => {
    console.log("Wait every 20 seconds due to rate limit")
    solanaProvider(connection, programId, redisClient);
}, parseInt(process.env.POLL_FREQUENCY))