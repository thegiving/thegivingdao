import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await storeAccountData(req, res);
  } else if (req.method === "GET") {
    return await getAccountData(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function storeAccountData(req, res) {
  const body = req.body;
  try {
    const files = await makeFileObjects(body);
    const cid = await storeFiles(files);
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating account", success: false });
  }
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

async function makeFileObjects(body) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `public/${body.profilePicUrl}`);

  const files = await getFilesFromPath(imageDirectory);
  files.push(new File([buffer], "data.json"));
  console.log(files);
  return files;
}

async function getAccountData(req, res) {
  const { cid } = req.query;
  try {
    const file = await getFile(cid);
    return res.status(200).json({ success: true, file: file});;
  } catch (err) {
    return res.status(500).json({ error: "Error creating account", success: false });
  }
}

async function getFile(cid) {
  const client = makeStorageClient();
  const response = await client.get(cid);
  let fileContent;

  if (response) {
    const files = await response.files();
    for (const file of files) {
      if (file.name === "data.json") {
        fileContent = await file.text();
      }
    }

  }
  return fileContent;
}
function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_API_TOKEN });
}
