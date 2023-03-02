import * as fs from "fs";
import { AxiosInstance } from "axios";

export default async function downloadUrl(
  client: AxiosInstance,
  url: string,
  toPath: string
): Promise<void> {
  const writer = fs.createWriteStream(toPath);

  const response = await client({
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
