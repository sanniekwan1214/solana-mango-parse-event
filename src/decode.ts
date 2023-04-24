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
