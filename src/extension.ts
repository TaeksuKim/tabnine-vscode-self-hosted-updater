import * as vscode from "vscode";
import confirm from "./confirm";
import {
  SELF_HOSTED_UPDATER_VERSION_KEY,
  RELOAD_BUTTON_LABEL,
  RELOAD_COMMAND,
} from "./consts";
import serverUrl from "./serverUrl";
import updateTask from "./updateTask";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  try {
    const url = await serverUrl();
    const currentVersion = context.globalState.get<string>(
      SELF_HOSTED_UPDATER_VERSION_KEY
    );
    void updateTask(url, currentVersion).then(async (latestVersion) => {
      if (
        latestVersion &&
        (await confirm("Tabnine Enterprise updated", RELOAD_BUTTON_LABEL))
      ) {
        context.globalState.update(
          SELF_HOSTED_UPDATER_VERSION_KEY,
          latestVersion
        );
        await vscode.commands.executeCommand(RELOAD_COMMAND);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage("Tabnine Self Hosted Updater is disabled");
  }
}

export async function deactivate() {}
