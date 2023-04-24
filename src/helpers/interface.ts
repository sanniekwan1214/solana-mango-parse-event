export interface EventData {
    event: string;
    data: string;
    return: string;
}

export interface EventObject {
    signature: string;
    blocktime: number;
    event: EventData[];
}

export interface BookData {
    orderId: string;
    quantity: string;
    price: string;
}

export interface Order  {
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