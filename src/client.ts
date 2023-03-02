import { workspace } from "vscode";
import * as Url from "url";
import axios, { AxiosInstance } from "axios";

function proxyUrl(): string | undefined {
  return (
    workspace.getConfiguration().get<string>("http.proxy") ||
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy
  );
}

export default function client(selfHostedServerUrl: string): AxiosInstance {
  const axiosClient = axios.create({ baseURL: selfHostedServerUrl });
  const url = proxyUrl();

  if (url) {
    const { hostname: host, protocol, port } = Url.parse(url);
    if (host && protocol && port) {
      axiosClient.defaults.proxy = {
        host,
        protocol,
        port: parseInt(port),
      };
    }
  }

  return axiosClient;
}
