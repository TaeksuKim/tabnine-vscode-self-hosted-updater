import { ExtensionContext } from "vscode";
import { SELF_HOSTED_UPDATER_VERSION_KEY } from "./consts";

export async function removeCurrentVersion(
  context: ExtensionContext
): Promise<void> {
  await context.globalState.update(SELF_HOSTED_UPDATER_VERSION_KEY, undefined);
}

export default async function currentVersion(
  context: ExtensionContext,
  version?: string
): Promise<string | undefined> {
  if (version) {
    await context.globalState.update(SELF_HOSTED_UPDATER_VERSION_KEY, version);
    return version;
  }

  return context.globalState.get(SELF_HOSTED_UPDATER_VERSION_KEY);
}
