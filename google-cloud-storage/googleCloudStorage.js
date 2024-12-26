import { Storage } from "@google-cloud/storage";
import { join } from "path";
const projectId = "owleyewear";
const keyFilename = process.env.GCS_JSON || "./owleyewear-462ba5459453.json";
const storage = new Storage({ projectId, keyFilename });
const dirgcs = "storeTVDisplay/";
export async function uploadFile() {
    try {
        // Uploads a local file to the bucket
        await storage
            .bucket("owleyewear.appspot.com")
            .upload(join(__dirname, "text.txt"), {
            destination: `demoTest/test.rtf`,
        });
        console.log(`File test.rtf uploaded to owleyewear.appspot.com/demoTest`);
    }
    catch (err) {
        console.error("Error uploading file:", err);
    }
}
export function uploadStreamFile(filename) {
    try {
        return storage
            .bucket("owleyewear.appspot.com")
            .file(dirgcs + filename)
            .createWriteStream();
    }
    catch (err) {
        console.error("Error uploading file:", err);
    }
}
export async function listFiles() {
    // Lists files in the bucket
    const options = {
        prefix: dirgcs,
    };
    const [files] = await storage
        .bucket("owleyewear.appspot.com")
        .getFiles(options);
    return files;
}
export async function checkFileExist(fileName) {
    const listF = await listFiles();
    return listF.find((l) => l.name === dirgcs + fileName);
}
// listFiles().catch(console.error);
export async function downloadFile() {
    const options = {
        destination: "demoTest",
    };
    // Downloads the file
    await storage
        .bucket("owleyewear.appspot.com")
        .file("demoTest/test.rtf")
        .download(options);
    console.log(`gs://'owleyewear.appspot.com'/demoTest/test.rtf downloaded to demoTest.`);
}
export function downloadFileStream(filename) {
    return storage
        .bucket("owleyewear.appspot.com", {})
        .file(dirgcs + filename, {})
        .createReadStream({});
}
export function removeFile(filename) {
    return storage
        .bucket("owleyewear.appspot.com")
        .file(dirgcs + filename)
        .delete();
}
// downloadFile().catch(console.error);
