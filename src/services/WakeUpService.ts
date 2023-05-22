import axios from "axios";

const wakeUpService = async (url: string) => {
  console.log(`Awake ${url}`);
  await axios.get(url, {
    headers: { Accept: "application/json", "Accept-Encoding": "identity" },
  });
};

export { wakeUpService };
