import { decodeBase64ToU128, decodeData, decodeOrder } from "../src/decode";

describe("Decode base64", () => {
    test("decode u128", () => {
        const target = "ARGymv//////68sCAAAAAAA="
        const result = decodeBase64ToU128(target);
        console.log(`decode u128 ${result}`)
        expect(result).not.toBe(null);
    });
    test("decode u128 AA", () => {
        const target = "AA="
        const result = decodeBase64ToU128(target);
        console.log(`decode AA u128 ${result}`)
        expect(result).toEqual("0");
    });

    test("decode data and order", () => {
        const data = 'F5qwwQsqqPRbF8fIam5zn68XUYGDY+lPkIvzcATObT+88Ze90vUfHJkkMap8XXTKj6NnPBclpQbDMLO6e7gEChYlmbpBDE9sAADrs717g/vcXAAAAAAAAAAAcveEk1UA7kQPAAAAAAAAANb1tYwrUf1gDwAAAAAAAAA='
        const decodedDataHex = decodeData(data);
        const result= decodeOrder(decodedDataHex);
        console.log('decode data and order', result)
        expect(result).not.toBe(null);
    });
});
