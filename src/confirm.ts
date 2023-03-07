import { window } from "vscode";

export default async function confirm(
  message: string,
  confirm: string
): Promise<boolean> {
  const selected = await window.showInformationMessage(
    message,
    { modal: true },
    confirm
  );
  return selected === confirm;
}
