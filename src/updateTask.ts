import { commands, Uri, window, ProgressLocation } from "vscode";
import downloadUrl from "./downloadUrl";
import * as tmp from "tmp";
import { promisify } from "util";
import * as semver from "semver";
import { INSTALL_COMMAND, UPDATE_PREFIX } from "./consts";
import createClient from "./client";
const createTmpFile = promisify(tmp.file);

/**
 * Update vsix task
 * @returns updatedVersion in case of update, otherwise returns null
 */
export default async function updateTask(
  serverUrl: string,
  currentVersion: string | undefined
): Promise<string | null> {
  const client = createClient(serverUrl);
  let { data: latestVersion } = await client.get<string>(
    `${UPDATE_PREFIX}/version`,
    {
      proxy: false,
    }
  );
  latestVersion = latestVersion.trim();

  if (!currentVersion || semver.gt(latestVersion, currentVersion)) {
    await window.withProgress(
      {
        location: ProgressLocation.Window,
        cancellable: true,
        title: "Updating Tabnine plugin",
      },
      async () => {
        const path = await createTmpFile();
        await downloadUrl(
          client,
          `${UPDATE_PREFIX}/tabnine-vscode-${latestVersion.trim()}.vsix`,
          path
        );
        await commands.executeCommand(INSTALL_COMMAND, Uri.file(path));
      }
    );
    return latestVersion;
  }

  return null;
}
