export async function isDuplicate(client: any, signature: string) {

    const resp = await client.get(signature);
    if (resp === 'processed') return true
    else return false
}