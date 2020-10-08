import { ScWindowType } from "../../Enums/5000 - scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { IDataFriendly } from "../../Interfaces/Data/States/IDataFriendly";

export class DefaultFriendly implements IDataFriendly {
    Flavor = SnapShotFlavor[SnapShotFlavor.Live];
    NickName = '';
    TimeStamp = '';
    WindowType = ScWindowType[ScWindowType.Unknown];
}
