import { Web3Storage, File } from "web3.storage";

export async function saveToIPFS(image: File, fields: string) {
  const body = { image: image.name, ...JSON.parse(fields) }
  const buffer = Buffer.from(JSON.stringify(body));
  let dataFile = new File([buffer], "data.json");
  const cid = await storeFiles([image, dataFile])
  return cid;
};

export async function fetchFromIPFS(cid: string) {
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
