import { IStateLessElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";


export abstract class _BaseStateLessElemProxy extends _APICoreBase implements IStateLessElemProxy {
  async abstract InstantiateAsyncMembers(): Promise<void>;
}
