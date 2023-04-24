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