import React, { useState } from "react";
import { PadlockSpinner } from "./PadlockSpinner";
import FileInput from "./FileInput";

const EncryptFile: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [url, setUrl] = useState<string | undefined>(undefined);
  // Generate an AES-GCM key
  const recipientEmail = "caseyboyes@gmail.com";
  const generateKey = async () => {
    const generatedKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    return generatedKey;
  };

  // Encrypt the file
  const encryptFile = async (file: File) => {
    setIsPending(true);
    generateKey().then(async (key: CryptoKey) => {
      if (!key) {
        alert("Please generate a key first!");
        return;
      }
      const exportedKey = await window.crypto.subtle.exportKey("jwk", key);
      const fragment = recipientEmail + "+" + exportedKey.k;

      console.log("fragment: ", fragment);
      //   const encodedFragment = "#" + btoa(fragment);
      const url =
        `${import.meta.env.VITE_LOCAL_BASE_URL}` + "decrypt" + "#" + fragment;
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
      const fileBuffer = await file.arrayBuffer(); // Read file as ArrayBuffer

      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileBuffer
      );
      // Prepare for download
      const blob = new Blob([iv, encrypted], {
        type: file.type,
      });
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `enc-${file.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setUrl(url);
        setIsPending(false);
      }, 1000);
    });
  };

  return (
    <FileInput
      file={file!}
      isPending={isPending}
      setFile={setFile}
      fn={encryptFile}
      title="Encrypt a File"
      url={url}
      pendingText="Encrypting..."
      buttonText="ENCRYPT"
    />
  );
};

export default EncryptFile;
