import { Connection, PublicKey } from '@solana/web3.js';

// Solana RPC endpoint URL
export const RPC_URL = 'https://api.mainnet-beta.solana.com/';

// Connection object that can be reused across the app
let connection: Connection | null = null;

// Get the Solana connection object, creating a new one if needed
export async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = new Connection(RPC_URL);
    // Confirm that the connection is healthy
    const version = await connection.getVersion();
    console.log(`Connected to Solana RPC endpoint v${version['solana-core']}`);
  }
  return connection;
}

// Get program accounts filtered by program ID
export async function getFilteredProgramAccounts(connection: Connection, programId: PublicKey): Promise<any[]> {
  const filter = {
    memcmp: {
      offset: 0,
      bytes: programId.toBase58(),
    },
  };
  const response = await connection.getProgramAccounts(programId, {
    filters: [filter],
  });
  return response.map((acc) => {
    return {
      pubkey: acc.pubkey.toBase58(),
      account: {
        ...acc.account,
        data: Buffer.from(acc.account.data),
      },
    };
  });
}
