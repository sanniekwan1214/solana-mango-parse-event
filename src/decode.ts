import { Buffer } from 'buffer';

export const base64ToBuffer = (base64: string): Buffer => {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return Buffer.from(bytes);
};

export const decodeData = (encoded: string): string => {
  const buffer = base64ToBuffer(encoded);
  return buffer.slice(0, -1).toString('hex');
};

export const decodeOrder = (input: string): any => {
  const orderArray = []
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
  orderArray.push({
    side,
    priceLots,
    maxBaseLots,
    maxQuoteLots,
    clientOrderId: Number(clientOrderId),
    orderType,
    reduceOnly,
    expiryTimestamp: Number(expiryTimestamp),
    limit
  })
  return orderArray
};

export function decodeBase64ToU128(encoded: string): string {
  // Decode the input from Base64
  let buffer = Buffer.from(encoded, "base64");

  if (buffer.length < 16) {
    const paddedBuffer = Buffer.alloc(16, 0);
    buffer.copy(paddedBuffer, 16 - buffer.length);
    buffer = paddedBuffer;
  }
  // Convert the decoded bytes to a u128 in big-endian byte order
  const low = buffer.readBigUInt64LE();
  const high = buffer.readBigUInt64LE(8);
  const result = ((high << BigInt(64)) + low).toString();

  return result;
}