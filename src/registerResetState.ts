import * as vscode from "vscode";
import confirmReload from "./confirmReload";
import { RESET_STATE_COMMAND } from "./consts";
import { removeCurrentVersion } from "./currentVersion";

export default function registerResetState(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(RESET_STATE_COMMAND, async () => {
      removeCurrentVersion(context);
      await confirmReload("State was reset");
    })
  );
}
