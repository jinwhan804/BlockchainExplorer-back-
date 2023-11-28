import db from "../database";
interface InputData {
  "0": string;
  "1": string;
  "2": bigint;
  __length__: number;
  from: string;
  to: string;
  value: bigint;
}

const result: Record<string, any> = {};

export const createEventlog = async (eventdata: any) => {
  try {
    // console.log("createEventlog", eventdata);
    const {
      address,
      blockHash,
      blockNumber,
      data,
      logIndex,
      removed,
      topics,
      transactionHash,
      transactionIndex,
      returnValues,
      event,
      signature,
    } = eventdata;
    const jsonString = JSON.stringify(returnValues, (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    });

    // console.log(
    //   "hahsdhahdsha",
    //   address,
    //   blockHash,
    //   blockNumber,
    //   data,
    //   logIndex,
    //   removed,
    //   topics,
    //   transactionHash,
    //   transactionIndex,
    //   returnValues,
    //   event,
    //   signature
    // );
    const result = await db.models.EventLog.create({
      address,
      blockHash,
      blockNumber,
      data,
      logIndex,
      removed,
      topics,
      transactionHash,
      transactionIndex,
      returnValues: jsonString,
      event,
      signature,
    });
    // console.log("hahsdhahdsha", result);
    return result;
  } catch (error) {
    console.log("createEventlog 오류발생", error);
  }
};
