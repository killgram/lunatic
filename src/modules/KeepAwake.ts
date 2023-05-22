import { client, CONSTANTS } from "../configurations";
import { wakeUpService, setupLogService } from "../services";

interface IResult {
  url: string;
  date: Date;
  status: boolean;
  error?: string;
}

const keepAwake = async (): Promise<null> => {
  const result: Array<IResult> = [];
  const data: string[] = await client.lRange(CONSTANTS.TABLE_NAME, 0, -1);

  try {
    for (let i: number = 0; i < data?.length; i++) {
      const res = await wakeUpService(data[i]);
      let calcRes: IResult = {
        url: data[i],
        date: new Date(),
        status: res?.status,
      };
      if (!res.status) {
        calcRes.error = res?.error;
      }
      result.push(calcRes);
    }
    await setupLogService(JSON.stringify(result));
  } catch (e) {
    console.log((e as Error).message);
    console.log("__Can't_awake_for_some_reason__");
  }

  return null;
};

export { keepAwake };
