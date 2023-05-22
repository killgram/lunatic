import { bitbucketClient } from "../configurations";

const bitbucketUpload = async (name: string, data: string): Promise<void> => {
  try {
    await bitbucketClient?.upload(`${name}.json`, data);
  } catch (e) {
    console.log((e as Error).message);
    console.log("__BitBucket_Error_Upload__");
  }
};

export { bitbucketUpload };
