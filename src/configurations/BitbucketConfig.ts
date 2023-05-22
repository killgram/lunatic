import { Storage } from "megajs";
import { CONSTANTS } from "./Constants";

let bitbucketClient: Storage;

const initBitbucket = async () => {
  bitbucketClient = await new Storage({
    email: CONSTANTS.BITBUCKET_USER,
    password: CONSTANTS.BITBUCKET_PASS,
  }).ready;
};

export { initBitbucket, bitbucketClient };
