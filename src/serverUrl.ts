import { workspace } from "vscode";
import { SELF_HOSTED_SERVER_CONFIGURATION } from "./consts";

export default function serverUrl(): string | undefined {
  return workspace
    .getConfiguration()
    .get<string>(SELF_HOSTED_SERVER_CONFIGURATION);
}
