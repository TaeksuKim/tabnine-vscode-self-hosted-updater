import * as fs from "fs";
import axios from "axios";

export default async function downloadUrl(
  url: string,
  toPath: string
): Promise<void> {
  const writer = fs.createWriteStream(toPath);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
