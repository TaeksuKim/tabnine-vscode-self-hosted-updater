import axios from "axios";
import { commands, Uri } from "vscode";
import downloadUrl from "./downloadUrl";
import * as tmp from "tmp";
import { promisify } from "util";
import * as semver from "semver";
import confirm from "./confirm";
import { INSTALL_COMMAND, UPDATE_BUTTON_LABEL } from "./consts";
const createTmpFile = promisify(tmp.file);

/**
 * Update vsix task
 * @returns updatedVersion in case of update, otherwise returns null
 */
export default async function updateTask(
  enterpriseServerUrl: string,
  currentVersion: string | undefined
): Promise<string | null> {
  const { data: latestVersion } = await axios.get<string>(
    enterpriseServerUrl + "/version"
  );

  if (currentVersion && semver.lte(latestVersion, currentVersion)) {
    return null;
  }

  if (
    !(await confirm(
      `Tabnine ${latestVersion} is available!`,
      UPDATE_BUTTON_LABEL
    ))
  ) {
    return null;
  }

  const path = await createTmpFile();
  await downloadUrl(
    `${enterpriseServerUrl}/tabnine-vscode-${latestVersion}.vsix`,
    path
  );
  await commands.executeCommand(INSTALL_COMMAND, Uri.file(path));
  return latestVersion;
}
