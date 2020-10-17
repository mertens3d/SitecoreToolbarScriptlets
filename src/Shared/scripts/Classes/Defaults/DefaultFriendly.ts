import { ScWindowType } from "../../Enums/50 - scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { IDataFriendly } from "../../Interfaces/StateOf/IDataFriendly";

export class DefaultFriendly implements IDataFriendly {
    Flavor = SnapShotFlavor[SnapShotFlavor.Live];
    NickName = '';
    TimeStamp = '';
    WindowType = ScWindowType[ScWindowType.Unknown];
}
