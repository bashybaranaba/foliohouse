export async function decryptPreview(
  filePath: string,
  secretKey: string
): Promise<ArrayBuffer> {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch encrypted file: ${response.status} ${response.statusText}`
    );
  }
  const encryptedBlob = await response.blob();
  const encryptedData = await new Promise<ArrayBuffer>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error("Failed to read encrypted file."));
    };
    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer);
    };
    fileReader.readAsArrayBuffer(encryptedBlob.slice(16));
  });

  const iv = new Uint8Array(await encryptedBlob.slice(0, 16).arrayBuffer());
  const algorithm = { name: "AES-GCM", iv };
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    "AES-GCM",
    false,
    ["decrypt"]
  );
  const decryptedData = await window.crypto.subtle.decrypt(
    algorithm,
    key,
    encryptedData
  );

  const decodedData = new TextDecoder("utf-8").decode(decryptedData);
  const rows = decodedData.split("\n").slice(0, 10);
  const headerRow = rows.shift()?.split(",") || [];
  const data = rows.map((row) => {
    const rowArray = row.split(",");
    const rowData: Record<string, string> = {};
    for (let i = 0; i < headerRow.length; i++) {
      rowData[headerRow[i]] = rowArray[i] || "";
    }
    return rowData;
  });
  return data;
}
