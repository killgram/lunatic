import axios from "axios";

interface IWakeResponse {
  status: boolean;
  error?: string;
}

const wakeUpService = async (url: string): Promise<IWakeResponse> => {
  try {
    await axios.get(url, {
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });
    console.log(`${url} --- done`);
    return {
      status: true,
    };
  } catch (e) {
    console.log(`__Can't_awake_${url}__`);
    return {
      status: false,
      error: (e as Error).message,
    };
  }
};

export { wakeUpService };
