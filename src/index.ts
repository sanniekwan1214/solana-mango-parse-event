import { solanaProvider } from './solanaProvider'
import dotenv from 'dotenv';
import { Connection, PublicKey } from '@solana/web3.js';

dotenv.config();
const rpcUrl = process.env.RPC_URL;
const connection = new Connection(rpcUrl);

// Get the public key for the program account
const programId = new PublicKey(process.env.MANGO_ACC);

// Poll every 20 seconds due to rate limit
setInterval(async () => {
    solanaProvider(connection, programId);
}, parseInt(process.env.POLL_FREQUENCY))