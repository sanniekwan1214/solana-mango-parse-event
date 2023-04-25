import { extractMangoEvent } from "../src/extractMangoEvents";
import { logMessage1 } from './logMessage/logMessage'

describe("Extract Event", () => {
  test("Extract Mango Event", () => {
    const signature = '5LeXo8tgJosnNUMWZ7ocS14xhwe8xT8P5qesRknV4GuEnwS8oKJbKveNBX99eXMdmC7wGGK9R9EMi674VCuEDwRA';
    const blockNo = 1682446592
    const result = extractMangoEvent(signature, blockNo, logMessage1);
    console.log("extractMangoEvent ", result)
    expect(result).not.toBe(null);
  });
});