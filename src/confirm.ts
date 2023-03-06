import { window } from "vscode";

export default async function confirm(
  message: string,
  confirm: string,
  modal = false
): Promise<boolean> {
  const selected = await window.showInformationMessage(
    message,
    { modal },
    confirm
  );
  return selected === confirm;
}
