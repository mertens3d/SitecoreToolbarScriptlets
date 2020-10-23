//import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
//import { Guid } from "../../../Shared/scripts/Helpers/Guid";
//import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
//import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
//import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
//import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
//import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
//import { _ContentRecipeBase } from "./_ContentRecipeBase";

//export class RecipeInitFromQueryStr extends _ContentRecipeBase implements ICommandRecipes {
//  constructor(hindeCore: IHindeCore, commandData: ICommandData, dependancies: ICommandDependancies) {
//    super(hindeCore, commandData, dependancies, RecipeInitFromQueryStr.name);
//  }

//  Execute(): Promise<void> {
//    return new Promise(async (resolve, reject) => {
//      await this.InitFromQueryString()
//        .then(() => resolve())
//        .catch((err: any) => reject(err));
//    });
//  }

//}