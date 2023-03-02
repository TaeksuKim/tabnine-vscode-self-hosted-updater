import { commands, Uri } from "vscode";
import downloadUrl from "./downloadUrl";
import * as tmp from "tmp";
import { promisify } from "util";
import * as semver from "semver";
import { INSTALL_COMMAND } from "./consts";
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
  const { data: latestVersion } = await client.get<string>("/version");

  if (!currentVersion || semver.gte(latestVersion, currentVersion)) {
    const path = await createTmpFile();
    await downloadUrl(client, `/tabnine-vscode-${latestVersion}.vsix`, path);
    await commands.executeCommand(INSTALL_COMMAND, Uri.file(path));
    return latestVersion;
  }

  return null;
}
