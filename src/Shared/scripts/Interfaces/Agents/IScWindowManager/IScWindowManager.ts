import { ContentEditorProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowType } from "../../../Enums/scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";

export interface IScWindowProxy {
  ContentEditorProxy: ContentEditorProxy;
  DesktopProxy: DesktopProxy;
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUiProxy>;
  GetTopLevelDoc(): IDataOneDoc;
  Instantiate_ScWindowProxy(): Promise<void>;
  PublishActiveCE();
  SetCompactCss(targetDoc: IDataOneDoc);
  SetStateOfScWin(dataToRestore: IStateOfScUiProxy): Promise<void>
}
