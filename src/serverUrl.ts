import { Uri, workspace } from "vscode";
import { SELF_HOSTED_SERVER_CONFIGURATION } from "./consts";

export default function serverUrl(): string | undefined {
  const url = workspace
    .getConfiguration()
    .get<string>(SELF_HOSTED_SERVER_CONFIGURATION);

  validateUrl(url);
  return url;
}
function validateUrl(url: string | undefined) {
  try {
    Uri.parse(url || "", true);
  } catch (error) {
    console.error("Tabnine updater - wrong server url");
  }
}
