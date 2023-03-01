import { window, workspace } from "vscode";
import { SELF_HOSTED_SERVER_CONFIGURATION } from "./consts";

const configuration = workspace.getConfiguration();

export default async function enterpriseServerUrl(): Promise<string> {
  let enterpriseServerUrl = configuration.get<string>(
    SELF_HOSTED_SERVER_CONFIGURATION
  );
  if (enterpriseServerUrl) {
    return enterpriseServerUrl;
  }

  enterpriseServerUrl = await window.showInputBox({
    title: "Tabnine Self Hosted Updater",
    prompt: "Enter the URL of your self hosted Tabnine server",
    placeHolder: "https://tabnine.customer.com",
  });

  if (enterpriseServerUrl) {
    configuration.update(SELF_HOSTED_SERVER_CONFIGURATION, enterpriseServerUrl);
    return enterpriseServerUrl;
  }

  throw new Error("Tabnine self hosted server url is not set");
}
