import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const path = require('path');

export const config = {
  api: {
    bodyParser: false,
  },
};

import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (req) => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = path.resolve(
      process.cwd(),
      `public/uploads/`
    );

    let filename = ""; //  To avoid duplicate upload
    const form = formidable({
      maxFiles: 2,
    //   maxFileSize: 2048 * 2048, // 2mb
      uploadDir,
      filename: (_name, _ext, part) => {
        if (filename !== "") {
          return filename;
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "image" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await storeData(req, res);
  } else if (req.method === "GET") {
    return await getData(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function storeData(req, res) {
  const { fields, files } = await parseForm(req);

  const imageName = files.image.newFilename;
  const body = {image: imageName, ...fields}
  try {
    const files = await makeFileObjects(body);
    const cid = await storeFiles(files);
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    console.log('err: ' + err)
    return res
      .status(500)
      .json({ error: `Error: ${err}`, success: false });
  }
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

async function makeFileObjects(body) {
  const { image } = body;

  const buffer = Buffer.from(JSON.stringify(body));

  const uploadDir = path.resolve(
    process.cwd(),
    `public/uploads/${image}`
  );
  const files = await getFilesFromPath(uploadDir);

  files.push(new File([buffer], "data.json"));
  console.log(files);
  return files;
}

async function getData(req, res) {
  const { cid } = req.query;
  try {
    const file = await getFile(cid);
    const json = JSON.parse(file)
    const {image, ...params } = json;
    const imageURL = "https://ipfs.io/ipfs/" + cid + '/' + image.toString();
    const newJson = {image: imageURL, ...params}
    return res.status(200).json({ success: true, file: newJson});;
  } catch (err) {
    return res.status(500).json({ error: "Error getting object", success: false });
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
