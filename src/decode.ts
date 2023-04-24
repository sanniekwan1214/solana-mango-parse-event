import { Buffer } from 'buffer';
import { decode } from 'bs58';

const base64ToBuffer = (base64: string): Buffer => {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return Buffer.from(bytes);
};

const decodeData = (encoded: string): string => {
  const buffer = base64ToBuffer(encoded);
  return buffer.slice(0, -1).toString('hex');
};

const encodedData = 'vx89QqxinBZbF8fIam5zn68XUYGDY+lPkIvzcATObT+88Ze90vUfHAMAhkQ+jYSmIv///////////4ZEPo2EpiL///////////9GZdmJZTFTBwAAAAAAAAAAC/pRCwAAAAAAsXyZR5pRBwAAAAAAAAAAyhTD6gjEtvg0AwAAAAAAADZDx1CirDHhGQAAAAAAAACeXwAAAAAAABbbDb0nAAAAAAAAAAAAAAA=';

const decodedData = decodeData(encodedData);
console.log(decodedData);

/*
import { Buffer } from 'buffer';
type Order = {
  side: number,
  priceLots: number,
  maxBaseLots: number,
  maxQuoteLots: number,
  clientOrderId: number,
  orderType: number,
  reduceOnly: boolean,
  expiryTimestamp: number,
  limit: number
};

const decodeOrder = (input: string): Order => {
  const buffer = Buffer.from(input, 'hex');
  const side = buffer.readUInt8(0);
  const priceLots = buffer.readUInt32BE(1);
  const maxBaseLots = buffer.readUInt32BE(5);
  const maxQuoteLots = buffer.readUInt32BE(9);
  const clientOrderId = buffer.readBigUInt64BE(13);
  const orderType = buffer.readUInt8(21);
  const reduceOnly = buffer.readUInt8(22) === 1;
  const expiryTimestamp = buffer.readBigUInt64BE(23);
  const limit = buffer.readUInt8(31);
  return {
    side,
    priceLots,
    maxBaseLots,
    maxQuoteLots,
    clientOrderId: Number(clientOrderId),
    orderType,
    reduceOnly,
    expiryTimestamp: Number(expiryTimestamp),
    limit
  };
};
const input = 'bf1f3d42ac629c165b17c7c86a6e739faf1751818363e94f908bf37004ce6d3fbcf197bdd2f51f1c0000fa5182b895c7a6c7f8ffffffffffffff8262ddd252c4c5e6f7ffffffffffffff806d5d1f9640256c0000000000000000b8ce510b00000000006c5d1f9640256c0000000000000000a86ef3daad52a9b6c312000000000000585193bf277e13e0ba0b000000000000aa22000000000000d5dbe4f71800000000000000000000';

const decoded = decodeOrder(input);

console.log(decoded);

const input1 = 'bf1f3d42ac629c165b17c7c86a6e739faf1751818363e94f908bf37004ce6d3fbcf197bdd2f51f1c030086443e8d84a622ffffffffffffffffff86443e8d84a622ffffffffffffffffff4665d9896531530700000000000000000bfa510b0000000000b17c99479a51070000000000000000ca14c3ea08c4b6f834030000000000003643c750a2ac31e119000000000000009e5f00000000000016db0dbd2700000000000000000000'
const decoded1 = decodeOrder(input1);
console.log(decoded1)

const decodedData = atob('vx89QqxinBZbF8fIam5zn68XUYGDY+lPkIvzcATObT+88Ze90vUfHAMAhkQ+jYSmIv///////////4ZEPo2EpiL///////////9GZdmJZTFTBwAAAAAAAAAAC/pRCwAAAAAAsXyZR5pRBwAAAAAAAAAAyhTD6gjEtvg0AwAAAAAAADZDx1CirDHhGQAAAAAAAACeXwAAAAAAABbbDb0nAAAAAAAAAAAAAAA=');
console.log(decodedData);
*/