import { StateFullProxyDisciminator } from "../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _justWindowStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class WorkboxProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Workbox;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class InstallLicensesProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.InstalledLicenses;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class LicenseDetailsProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.LicenseDetails;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class RunProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Run;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}


export class EmailExpeprienceManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.EmailExperienceManager;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class ArchiveProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Archive;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class ScanForBrokenLinksProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.ScanForBrokenLinks;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class LogViewerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.LogViewer;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class InstallationWizardProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.InstallationWizard;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}
export class KeyBoardMapProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.KeyBoardMap;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class UserManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.UserManager;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class SecurityEditorProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.SecurityEditor;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class RoleManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.RoleManager;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class DomainManagerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.DomainManager;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class AccessViewerProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.AccessViewer;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}

export class RecycleBinProxy extends _justWindowStateFullProxy implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.RecycleBin;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[this.StateFullProxyDisciminator];
}