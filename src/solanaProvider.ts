import { PublicKey, Connection } from '@solana/web3.js';
import { extractMangoEvent } from './extractMangoEvents';
import fs from 'fs';
import { isDuplicate } from './helpers/utils';

export async function solanaProvider(connection: Connection, programId: PublicKey, redisClient: any) {
    const mangoEvent = [];

    try {
        const txSignatures = await connection.getConfirmedSignaturesForAddress2(programId, { limit: parseInt(process.env.TX_LIMIT) });
        console.log("txSignatures ", txSignatures);

        for (const txSignature of txSignatures) {
            // Check Duplication
            const isDuplicated = await isDuplicate(redisClient, txSignature.signature);
            console.log("is this signature processed? : ", isDuplicated)
            if (isDuplicated) {
                console.log(`signature ${txSignature.signature} is processed, so will skip this signature`);
                continue
            }
            const tx = await connection.getTransaction(txSignature.signature, { "maxSupportedTransactionVersion": 0 })

            // console.log(`Transaction Blocktime ${txSignature.signature}: `, tx.blockTime);
            // console.log(`Transaction AccountKeys ${txSignature.signature}: `, tx.transaction.message.addressTableLookups[0].accountKey);
            // console.log(`Transaction Message ${txSignature.signature}: `, tx.transaction.message);
            console.log(`Transaction Meta Log Msg ${txSignature.signature}: `, tx.meta.logMessages);
            let mangoEventSet = extractMangoEvent(txSignature.signature, tx.blockTime, tx.meta.logMessages);
            mangoEvent.push(mangoEventSet);

            // Mark proecessed in redis for each signature
            await redisClient.set(txSignature.signature, 'processed');
            // Wait for 5 seconds before making the next query aviod rate limit exceeds
            await new Promise(resolve => setTimeout(resolve, parseInt(process.env.TX_QUERY_FREQUENCY)));
        }
        const nowInSeconds = Math.floor(Date.now() / 1000);
        fs.writeFileSync(`./output/MangoEvents${nowInSeconds}.json`, JSON.stringify(mangoEvent, null, 2));
    } catch (err: any) {
        console.error(err);
        await redisClient.disconnect();
        process.exit(1);
    }
}


