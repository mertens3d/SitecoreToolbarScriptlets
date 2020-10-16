import { ScDocProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { _justWindowStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";

export class WorkboxProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.Workbox;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class InstallLicensesProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.InstalledLicenses;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class LicenseDetailsProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.LicenseDetails;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class RunProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.Run;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class EmailExpeprienceManagerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.EmailExperienceManager;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class ArchiveProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.Archive;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class ScanForBrokenLinksProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.ScanForBrokenLinks;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class LogViewerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.LogViewer;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class InstallationWizardProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.InstallationWizard;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}
export class KeyBoardMapProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.KeyBoardMap;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class UserManagerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.UserManager;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class SecurityEditorProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.SecurityEditor;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class RoleManagerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.RoleManager;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class DomainManagerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.DomainManager;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}

export class AccessViewerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.AccessViewer;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.AccessViewer];
}

export class RecycleBinProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.RecycleBin;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[this.ScDocProxyDisciminator];
}