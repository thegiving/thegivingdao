import { fetchFromIPFS, saveToIPFS } from './../../utils/ipfs';
import { NextApiRequest, NextApiResponse } from "next";
import { File } from "web3.storage";
import formidable from "formidable";
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from 'stream';

export const cache: Partial<Record<string, Promise<Response>>> = {};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return await storeData(req, res);
  } else if (req.method === "GET") {
    return await getData(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function storeData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new formidable.IncomingForm()
    const pass = new PassThrough()
    let imageName: string;

    form.onPart = part => {
      if (!part.originalFilename) {
        form._handlePart(part)
        return
      }
      part.on('data', function (buffer) {
        imageName = part.originalFilename;
        pass.write(buffer)
      })
      part.on('end', function () {
        pass.end()
      })
    }

    form.parse(req, async (err, fields) => {
      if (err) {
        return res.status(500).json({
          error: "Error parsing form",
        })
      }
      // re-create the image file from the PassThrough
      if (!imageName) {
        imageName = uuidv4();
      }
      const fileBuffer = Buffer.from(pass.read());
      const imageFile = new File([fileBuffer], imageName)
      const cid = saveToIPFS(imageFile, JSON.stringify(fields))
      return res.status(200).json({ success: true, cid: cid });
    })
  } catch (err) {
    console.log('err: ' + err)
    return res
      .status(500)
      .json({ error: `Error: ${err}`, success: false });
  }
}

async function getData(req: NextApiRequest, res: NextApiResponse) {
  const { cid } = req.query;
  try {
    const file = await fetchFromIPFS(cid as string);
    console.log("got fresh copy of file " + file)
    const json = JSON.parse(file)
    const { image, ...params } = json;
    const imageURL = "https://ipfs.io/ipfs/" + cid + '/' + image.toString();
    return res.status(200).json({ success: true, file: { imageURL: imageURL, ...params } });;
  } catch (err) {
    return res.status(500).json({ error: "Error getting object", success: false });
  }
}
