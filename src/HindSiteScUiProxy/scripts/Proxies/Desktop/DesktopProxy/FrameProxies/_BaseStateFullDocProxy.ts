import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { RecipeBasics } from "../../../../RecipeBasics";
import { _BaseScDocProxy } from "./_BaseScDocProxy";

export abstract class _BaseStateFullDocProxy<T> extends _BaseScDocProxy implements IStateFullDocProxy {
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  Friendly: string = '{unknown friendly}';
  RecipeBasics: RecipeBasics;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);

  }
}