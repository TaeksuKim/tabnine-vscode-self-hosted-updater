import * as vscode from "vscode";
import confirmReload from "./confirmReload";
import confirmServerUrl from "./confirmServerUrl";
import { SELF_HOSTED_SERVER_CONFIGURATION } from "./consts";
import currentVersion from "./currentVersion";
import registerResetState from "./registerResetState";
import serverUrl from "./serverUrl";
import updateTask from "./updateTask";

async function updateAndReload(
  context: vscode.ExtensionContext,
  serverUrl: string
) {
  const updatedVersion = await updateTask(
    serverUrl,
    await currentVersion(context)
  );
  if (updatedVersion) {
    await currentVersion(context, updatedVersion);
    await confirmReload("Tabnine updated");
  }
}

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  registerResetState(context);

  const url = serverUrl();

  if (url) {
    void updateAndReload(context, url);
  } else {
    void confirmServerUrl();
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(SELF_HOSTED_SERVER_CONFIGURATION)) {
        const url = serverUrl();
        if (url) {
          void updateAndReload(context, url);
        }
      }
    });
  }
}
