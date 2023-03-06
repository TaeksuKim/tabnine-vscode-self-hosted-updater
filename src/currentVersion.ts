import { Extension, extensions } from "vscode";
import { EXTENSION_SUBSTRING } from "./consts";

export default function currentVersion(): string | undefined {
  const tabnineExtension: Extension<unknown> | undefined = extensions.all.find(
    (x) => x.id.includes(EXTENSION_SUBSTRING) && x.isActive
  );
  return (tabnineExtension?.packageJSON as { version: string }).version;
}
