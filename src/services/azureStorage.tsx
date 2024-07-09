import { BlobServiceClient } from "@azure/storage-blob";

class AzureBlob {
  blobContainer: any;
  blobPDFContainer: any;
  connectionString: any;
  PDFConnectionString: any;
  blobAccount: any;

  constructor() {
    this.blobContainer = process.env.NEXT_PUBLIC_AZURE_BLOB_CONTAINER;
    this.connectionString = process.env.NEXT_PUBLIC_AZURE_BLOB_CONNECTION;
    this.blobPDFContainer = process.env.NEXT_PUBLIC_AZURE_BLOB_PDF_CONTAINER;
    this.PDFConnectionString =
      process.env.NEXT_PUBLIC_AZURE_PDF_BLOB_CONNECTION;
    this.blobAccount = process.env.NEXT_PUBLIC_AZURE_BLOB_ACCOUNT;
  }

  generateRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async uploadFile(file: any) {
    try {
      //@ts-ignore
      const blobServiceClient = new BlobServiceClient(this.connectionString);

      const extension = file.name.split(".").pop().toLowerCase();
      const filename = `${this.generateRandomString(7)}${new Date().getTime()}.${extension}`;
      const containerClient = blobServiceClient.getContainerClient(
        this.blobContainer
      );
      const blobClient = containerClient.getBlobClient(filename);
      const blockBlobClient = blobClient.getBlockBlobClient();

      if (extension.toLowerCase() === "svg") {
        //@ts-ignore
        options.blobHTTPHeaders = { blobContentType: "image/svg+xml" };
      }

      await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: { blobContentType: file.type },
      });
      return `https://${this.blobAccount}.blob.core.windows.net/${this.blobContainer}/${filename}`;
    } catch (error) {
      console.error("Failed to upload file", error);
      return "";
    }
  }

  async deleteFile(path: string) {
    try {
      const url = path;
      const parts = url.split("/");
      const filename = parts[parts.length - 1];
      const blobServiceClient = new BlobServiceClient(this.connectionString);
      const containerClient = blobServiceClient.getContainerClient(
        this.blobContainer
      );
      const blobClient = containerClient.getBlobClient(filename);
      await blobClient.delete();

      return true;
    } catch (error) {
      console.error("Failed to delete file");
      return false;
    }
  }
}

export default new AzureBlob();
