import { Web3Storage, File } from "web3.storage";

const saveToIPFS = async (image: File, fields: string) => {
  const _fields = JSON.parse(fields)
  const body = { image: image.name, ..._fields }
  const buffer = Buffer.from(JSON.stringify(body));

  let files = [image];
  files.push(new File([buffer], "data.json"));

  const cid = storeFiles(files)
  return cid;
};


async function storeFiles(files: File[]) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN });
}

export default saveToIPFS;
