import { ExtensionContext, window } from "vscode";
import { SELF_HOSTED_SERVER_CONFIGURATION } from "./consts";

export default async function serverUrl(
  context: ExtensionContext
): Promise<string> {
  let enterpriseServerUrl = context.globalState.get<string>(
    SELF_HOSTED_SERVER_CONFIGURATION
  );
  if (enterpriseServerUrl) {
    return enterpriseServerUrl;
  }

  enterpriseServerUrl = await window.showInputBox({
    title: "Tabnine Self Hosted Updater",
    prompt: "Enter the URL of your Tabnine Self Hosted server",
    placeHolder: "https://tabnine.customer.com",
  });

  if (enterpriseServerUrl) {
    context.globalState.update(
      SELF_HOSTED_SERVER_CONFIGURATION,
      enterpriseServerUrl
    );

    return enterpriseServerUrl;
  }

  throw new Error("Tabnine Self Hosted server url is not set");
}
