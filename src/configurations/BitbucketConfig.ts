import { Storage } from "megajs";
import { CONSTANTS } from "./Constants";

let bitbucketClient: Storage;

const initBitbucket = async () => {
  bitbucketClient = await new Storage({
    email: CONSTANTS.BITBUCKET_USER,
    password: CONSTANTS.BITBUCKET_PASS,
  }).ready;
  console.log("bitbucket is ready");
};

export { initBitbucket, bitbucketClient };
