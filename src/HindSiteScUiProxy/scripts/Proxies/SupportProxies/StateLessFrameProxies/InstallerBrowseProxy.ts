import { IStateLessDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { _baseStatelessDTFrameProxy } from "./_baseStatelessFrameProxy";

export class InstallerBrowseProxy extends _baseStatelessDTFrameProxy implements IStateLessDTFrameProxy {
    FrameSelectorOnHost: string;


    async InstantiateAsyncMembers(): Promise<void> {
        // empty
    }
}
