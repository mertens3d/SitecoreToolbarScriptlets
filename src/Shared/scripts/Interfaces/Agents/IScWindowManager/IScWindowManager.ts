import { ContentEditorProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowType } from "../../../Enums/scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScDocumentProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentProxy";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";

export interface IScWindowProxy {
  ContentEditorProxy: ContentEditorProxy;
  DesktopProxy: DesktopProxy;
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUiProxy>;
  GetTopLevelDoc(): ScDocumentProxy;
  Instantiate_ScWindowProxy(): Promise<void>;
  PublishActiveCE();
  SetCompactCss(targetDoc: ScDocumentProxy);
  SetStateOfScWin(dataToRestore: IStateOfScUiProxy): Promise<void>
}
