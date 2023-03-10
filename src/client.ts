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

function noProxy(selfHostedServerUrl: string): boolean {
  const { hostname: tabnineSelfHostedServerHost } =
    Url.parse(selfHostedServerUrl);
  const noProxyEnvVar = process.env.no_proxy || process.env.NO_PROXY;

  if (noProxyEnvVar) {
    const noProxyList = noProxyEnvVar.split(",");
    return noProxyList.some(
      (noProxy) => noProxy.trim() === tabnineSelfHostedServerHost
    );
  }

  return false;
}
export default function client(selfHostedServerUrl: string): AxiosInstance {
  const axiosClient = axios.create({ baseURL: selfHostedServerUrl });
  const url = proxyUrl();

  if (url) {
    const { hostname: host, protocol, port } = Url.parse(url);
    if (host && protocol && port && !noProxy(selfHostedServerUrl)) {
      axiosClient.defaults.proxy = {
        host,
        protocol,
        port: parseInt(port),
      };
    }
  }

  return axiosClient;
}
