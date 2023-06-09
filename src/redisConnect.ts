export async function redisConnect(client: any) {
    await client.connect()
    try {
        const resp = await client.ping()
        console.log(`Redis is connected successfully ping:${resp}`)
    } catch (err) {
        console.log("Redis is connected failed ", err)
    }
}
