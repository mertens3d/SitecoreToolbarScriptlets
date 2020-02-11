import { ISharedConst } from "./Interfaces/ISharedConst";

export class SharedConst {
  static SharedConst: ISharedConst = {
    IterHelper: {
      GrowthPerIteration: 0.5,

      MaxCount: {
        Default: 10,
        OverridePublishing: 15,
      },
      Timeouts: {
        Max: 10000,
        Default: 100,
      },
    },
  }

}