import { Web3Storage, File } from "web3.storage";

export const saveToIPFS = async (image: File, fields: string) => {
  const _fields = JSON.parse(fields)
  const body = { image: image.name, ..._fields }
  const buffer = Buffer.from(JSON.stringify(body));

  let files = [image];
  files.push(new File([buffer], "data.json"));

  const cid = await storeFiles(files)
  return cid;
};

export async function getIPFSData(cid: string) {
  try {
    const file = await getFile(cid);
    // console.log("got fresh copy of file " + JSON.stringify(file))
    const json = JSON.parse(file)
    const {image, ...params } = json;
    const imageURL = "https://ipfs.io/ipfs/" + cid + '/' + image.toString();
    return { file: {image: imageURL, ...params} };
  } catch (err) {
    `Oops! Something went wrong. Please refresh and try again. Error ${err}`
    throw err;
  }
}

async function getFile(cid: string) {
  const client = makeStorageClient();
  const response = await client.get(cid);

  if (response) {
    const files = await response.files();
    for (const file of files) {
      if (file.name === "data.json") {
        const fileContent = await file.text();
        return fileContent
      }
    }
  }
  return null;
}

async function storeFiles(files: File[]) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_API_TOKEN });
}
