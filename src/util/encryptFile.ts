export async function encryptFile(
  file: File,
  secretKey: string
): Promise<Blob> {
  const fileReader = new FileReader();
  const fileContents = await new Promise<ArrayBuffer>((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error("Failed to read file."));
    };
    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer);
    };
    fileReader.readAsArrayBuffer(file);
  });

  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const algorithm = { name: "AES-GCM", iv };
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    "AES-GCM",
    false,
    ["encrypt"]
  );
  const encryptedData = await window.crypto.subtle.encrypt(
    algorithm,
    key,
    fileContents
  );
  const encryptedBlob = new Blob([iv, new Uint8Array(encryptedData)], {
    type: file.type,
  });
  return encryptedBlob;
}
