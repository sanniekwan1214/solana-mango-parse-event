import idl from './mangoIDL/mango_v4.json';
import { EventObject } from './helpers/interface';
import { MANGO_EVENT_BOOK_PREFIX, MANGO_EVENT_DATA_PREFIX, MANGO_EVENT_INSTRUCTTION_PREFIX, MANGO_EVENT_RETURN_PREFIX } from './helpers/constants';
import { decodeData, decodeOrder } from './decode';

const arr_supportedInstruction = idl.instructions.map((instruction) => instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1))
//console.log("arr_supportedInstruction ", arr_supportedInstruction);
export function extractMangoEvent(txSignature: string, blockTime: number, logMessages: string[]) {
    const events = [];

    // initialize targetEvent with empty data and return values
    let targetEvent = {
        event: '',
        data: '',
        return: '',
        bookData: {
            orderId: '',
            quantity: '',
            price: ''
        }
    };

    // loop through the logMessages to extract the MangoEvents
    for (const logMessage of logMessages) {
        let mangoEvent = '';
        let mangoEventReturn = '';
        let mangoEventData = '';

        if (logMessage.startsWith(MANGO_EVENT_INSTRUCTTION_PREFIX)) {
            mangoEvent = logMessage.slice(MANGO_EVENT_INSTRUCTTION_PREFIX.length).trim();
            if (arr_supportedInstruction.includes(mangoEvent)) {
                targetEvent.event = mangoEvent;
            }
        }
        else if (logMessage.startsWith(MANGO_EVENT_BOOK_PREFIX)) {
            mangoEventReturn = logMessage.slice(MANGO_EVENT_BOOK_PREFIX.length).trim();
            targetEvent.bookData.orderId = mangoEventReturn.match(/order_id=(\d+)/)[1];;
            targetEvent.bookData.quantity = mangoEventReturn.match(/quantity=(\d+)/)[1];
            targetEvent.bookData.price = mangoEventReturn.match(/price=(\d+)/)[1];
        }
        else if (logMessage.startsWith(MANGO_EVENT_RETURN_PREFIX)) {
            mangoEventReturn = logMessage.slice(MANGO_EVENT_RETURN_PREFIX.length).trim();
            targetEvent.return = mangoEventReturn;
        }
        else if (logMessage.startsWith(MANGO_EVENT_DATA_PREFIX)) {
            mangoEventData = logMessage.slice(MANGO_EVENT_DATA_PREFIX.length).trim();
            const decodedDataHex = decodeData(mangoEventData);
            const decodedOrder= decodeOrder(decodedDataHex);
            console.log(decodedOrder)
            targetEvent.data = decodedOrder;
        }
        else if (targetEvent.event && (targetEvent.data || targetEvent.return)) {
            // if targetEvent has a valid event and data or return values, add it to events array
            events.push(targetEvent);
            // reset targetEvent with empty data and return values
            targetEvent = {
                event: '',
                data: '',
                return: '',
                bookData: {
                    orderId: '',
                    quantity: '',
                    price: ''
                }
            };

        }
        else if (targetEvent.event && targetEvent.data === "" && targetEvent.return === "") {
            events.push(targetEvent);
            // reset targetEvent with empty data and return values
            targetEvent = {
                event: '',
                data: '',
                return: '',
                bookData: {
                    orderId: '',
                    quantity: '',
                    price: ''
                }
            };
        }
    }

    // log the extracted events to the console
    const mangoEventObject: EventObject = {
        signature: txSignature,
        blocktime: blockTime,
        event: events
    };
    return mangoEventObject

}