const jose = require("jose");
const fs = require("fs").promises;
const createReadStream = require("fs").createReadStream;
const path = require("path");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
  pinataJWTKey: process.env.PINATA_JWT,
});
const { ethers } = require("ethers");

module.exports = {
  createTicket: async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.file);
      const { eventName, date, numberOfTickets, location, siteUrl, QR } =
        req.body;
      const { file } = req.file;

      const metaData = (i) => {
        return JSON.stringify({
          name: `${eventName}`,
          description: "Event Ticket powered by Savvy",
          image: QR,
          external_url: siteUrl,
          attributes: [
            {
              display_type: "date",
              trait_type: "Date",
              value: date,
            },
            {
              trait_type: "Location",
              value: location,
            },
          ],
        });
      };

      try {
        const response = await pinata.pinJSONToIPFS(JSON.parse(metaData(0)), {
          pinataMetadata: { name: eventName },
        });
        return res.status(200).json({
          message: "Upload to IPFS success",
          hash: response.IpfsHash,
          numberOfTickets: numberOfTickets,
          eventName: eventName,
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "Failed to upload to IPFS" });
      }

      //   // 폴더 생성, 파일 생성, ipfs pinning 시도
      //   fs.mkdir(`${__dirname}/../metadata/${eventName?.split(" ")[0]}`, {
      //     recursive: true,
      //   })
      //     .then(async (result) => {
      //       const promises = [];
      //       for (let i = 0; i < numberOfTickets; i++) {
      //         promises.push(
      //           fs.writeFile(
      //             `${__dirname}/../metadata/${eventName?.split(" ")[0]}/${
      //               eventName?.split(" ")[0]
      //             }_${i}.json`,
      //             metaData(i)
      //           )
      //         );
      //       }
      //       return Promise.all(promises);
      //     })
      //     .then(async (result) => {
      //       console.log(result);
      //       const fullJSONPath = path.resolve(
      //         `${__dirname}/../metadata/${eventName?.split(" ")[0]}`
      //       );
      //       console.log(fullJSONPath);
      //       const files = await fs.readdir(fullJSONPath);
      //       console.log(files);

      //       let responses = [];
      //       console.log("Uploading to Pinata !!!");

      //       // Create an array of promises

      //       const promises = files.map(async (file) => {
      //         const readableStreamForFile = createReadStream(
      //           `${fullJSONPath}/${file}`
      //         );
      //         const response = await pinata.pinFileToIPFS(readableStreamForFile, {
      //           pinataMetadata: { name: file },
      //         });
      //         console.log(response);
      //         return response;
      //       });

      //       // Wait for all promises to resolve
      //       responses = await Promise.all(promises);
      //       return res.status(200).json({ responses, files });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       return res
      //         .status(400)
      //         .json({ error: "Failed to upload metadata to IPFS" });
      //     });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "internal server error" });
    }
  },
};
