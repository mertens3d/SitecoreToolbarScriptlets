import { IDesktopProxy } from "../Proxies/IDesktopProxy";
import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IFactoryApi {
    NewDesktopProxy(associatedDoc: IDataOneDoc): IDesktopProxy;
}
