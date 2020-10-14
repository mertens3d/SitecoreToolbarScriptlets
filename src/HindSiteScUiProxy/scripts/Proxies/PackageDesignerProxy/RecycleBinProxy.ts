import { StateFullProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { _justWindowStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";

export class WorkboxProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.Workbox;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class InstallLicensesProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.InstalledLicenses;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class LicenseDetailsProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.LicenseDetails;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class RunProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.Run;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class EmailExpeprienceManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.EmailExperienceManager;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class ArchiveProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.Archive;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class ScanForBrokenLinksProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.ScanForBrokenLinks;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class LogViewerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.LogViewer;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class InstallationWizardProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.InstallationWizard;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}
export class KeyBoardMapProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.KeyBoardMap;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class UserManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.UserManager;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class SecurityEditorProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.SecurityEditor;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class RoleManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.RoleManager;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class DomainManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.DomainManager;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class AccessViewerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.AccessViewer;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.AccessViewer];
}

export class RecycleBinProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  readonly StateFullProxyDisciminator = StateFullProxyDisciminator.RecycleBin;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}