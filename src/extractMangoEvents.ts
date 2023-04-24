import idl from './mango_v4.json';
import { EventObject } from './helpers/interface';
// define the MangoEvent prefix
const mangoEventPrefix = 'Program log: Instruction:';
const mangoEventReturnPrefix = 'Program return:';
const mangoEventDataPrefix = 'Program data:';

const arr_supportedInstruction = idl.instructions.map((instruction) => instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1))
//console.log("arr_supportedInstruction ", arr_supportedInstruction);
export function extractMangoEvent(txSignature: string, blockTime: number, logMessages: string[]) {
    const events = [];

    // initialize targetEvent with empty data and return values
    let targetEvent = {
        event: '',
        data: '',
        return: ''
    };

    // loop through the logMessages to extract the MangoEvents
    for (const logMessage of logMessages) {
        let mangoEvent = '';
        let mangoEventReturn = '';
        let mangoEventData = '';

        if (logMessage.startsWith(mangoEventPrefix)) {
            mangoEvent = logMessage.slice(mangoEventPrefix.length).trim();
            if (arr_supportedInstruction.includes(mangoEvent)) {
                targetEvent.event = mangoEvent;
            }
        }
        else if (logMessage.startsWith(mangoEventReturnPrefix)) {
            mangoEventReturn = logMessage.slice(mangoEventReturnPrefix.length).trim();
            targetEvent.return = mangoEventReturn;
        }
        else if (logMessage.startsWith(mangoEventDataPrefix)) {
            mangoEventData = logMessage.slice(mangoEventDataPrefix.length).trim();
            targetEvent.data = mangoEventData;
        }
        else if (targetEvent.event && (targetEvent.data || targetEvent.return)) {
            // if targetEvent has a valid event and data or return values, add it to events array
            events.push(targetEvent);
            // reset targetEvent with empty data and return values
            targetEvent = {
                event: '',
                data: '',
                return: ''
            };

        }
        else if (targetEvent.event && targetEvent.data === "" && targetEvent.return === "") {
            events.push(targetEvent);
            // reset targetEvent with empty data and return values
            targetEvent = {
                event: '',
                data: '',
                return: ''
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