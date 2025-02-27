import { useState } from "react";
import FileInput from "./FileInput";

const DecryptFile: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const decrypt = async () => {
    setIsPending(true);
    const fragment = window.location.hash.slice(1);
    // const decodedFrag = atob(fragment);
    // console.log(decodedFrag);
    const sections = fragment.split("+");
    // const email = sections[0];
    const extractedKey = sections[1];
    const encryptionKey = extractedKey;
    console.log(encryptionKey);

    const cryptoKey = await window.crypto.subtle.importKey(
      "jwk",
      {
        alg: "A256GCM",
        ext: true,
        k: encryptionKey,
        key_ops: ["encrypt", "decrypt"],
        kty: "oct",
      },
      {
        name: "AES-GCM",
        length: 256,
      },
      false,
      ["decrypt"]
    );

    const fileBuffer = await file!.arrayBuffer();
    const iv = new Uint8Array(await fileBuffer.slice(0, 12)); // Extract IV
    const encryptedData = fileBuffer.slice(12); // Extract encrypted content
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      encryptedData
    );
    // Create a Blob for the decrypted file
    const blob = new Blob([decrypted], { type: file?.type });
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `dec${file?.name.slice(3)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsPending(false);
    }, 1000);
  };
  return (
    <FileInput
      file={file!}
      isPending={isPending}
      setFile={setFile}
      fn={decrypt}
      title="Decrypt a File"
      pendingText="Decrypting..."
      buttonText="DECRYPT"
    />
  );
};
export default DecryptFile;
