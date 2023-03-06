import { ExtensionContext, Extension, extensions } from "vscode";
import { EXTENSION_SUBSTRING, SELF_HOSTED_UPDATER_VERSION_KEY } from "./consts";

export async function removeCurrentVersion(
  context: ExtensionContext
): Promise<void> {
  await context.globalState.update(SELF_HOSTED_UPDATER_VERSION_KEY, undefined);
}

export default function currentVersion(): string | undefined {
  const tabnineExtension: Extension<unknown> | undefined = extensions.all.find(
    (x) => x.id.includes(EXTENSION_SUBSTRING) && x.isActive
  );
  return (tabnineExtension?.packageJSON as { version: string }).version;
}
