import React, { useEffect, useState } from "react";

import { create } from "ipfs-http-client";
import { Form } from "react-bootstrap";

const INFURA_ID = "2Np7iR6NoQwDpRffHt1obWRquWr";
const INFURA_SECRET_KEY = "8bc34689eecdc653d9f4db3aa24935bb";

const auth =
  "Basic " +
  Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

async function ipfsClient() {
  const ipfs = await create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth, // infura auth credentails
    },
  });
  return ipfs;
}

async function saveFile(data) {
  console.log("save file input: ", data);
  let ipfs = await ipfsClient();

  let options = {
    wrapWithDirectory: false,
    progress: (prog) => console.log(`Saved :${prog}`),
  };
  let result = await ipfs.add(data, options);
  console.log("save file output: ", result);
  return result;
}

async function getData(hash) {
  console.log("getData input: ", hash);
  let data = "https://ipfs.io/ipfs/" + hash.toString();
  data = await fetch(data).then((res) => res.text());
  console.log("get data output: ", data);
  return data;
}

function Doc() {
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleFileChange = (files) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  useEffect(() => {
    if (imageFile) {
      saveFile(imageFile).then((res) => {
        getData(res["path"]).then((res) => {
          setFile(res);
        });
      });
    }
  }, [imageFile]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Form.Group controlId="formFile">
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </Form.Group>
      {file && (
        <img
          src={file}
          style={{ width: "200px", height: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}

export default Doc;
