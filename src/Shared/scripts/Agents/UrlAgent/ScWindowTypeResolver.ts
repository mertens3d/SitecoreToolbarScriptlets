import { ScWindowType } from "../../Enums/50 - scWindowType";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IScWindowTypeDeterminator } from "../../Interfaces/IPageDeterminator";
import { IUrlJacket } from "../../Interfaces/IUrlAgent";
import { IScWindowTypeResolver } from "../../Interfaces/Jackets/IScUrlAgent";
import { _CommonBase } from "../../_CommonCoreBase";
import { IQueryKeyValuePair } from "./IQueryKeyValuePair";
import { ScWindowTypeDeterminators } from "../../Collections/ScWindowTypeDeterminators";

export class ScWindowTypeResolver extends _CommonBase implements IScWindowTypeResolver {
  constructor(commonCore: ICommonCore) {
    super(commonCore);
    this.Logger.CTORStart(ScWindowTypeResolver.name);
    //this.ErrorHand.ThrowIfNullOrUndefined(ScPageTypeResolver.name, [urlJacket]);
    this.Logger.FuncEnd(ScWindowTypeResolver.name);
  }

  private RunJacketAgainstAllDeterminators(UrlJacket: IUrlJacket): IScWindowTypeDeterminator {
    let determinators: IScWindowTypeDeterminator[] = ScWindowTypeDeterminators.ScWindowTypeDeterminators;
    let toReturnPageDeterminator: IScWindowTypeDeterminator = null;

    determinators.forEach((determinant: IScWindowTypeDeterminator) => {
      let passed: boolean = true;
      determinant.ConfidenceScore = 0;

      passed = this.TestJacketAgainstRegex(determinant.RegexPathTest, UrlJacket);
      if (passed) {
        let regExAsStr: string = determinant.RegexPathTest.toString();
        if (regExAsStr.charAt(0) === "/") {
          regExAsStr = regExAsStr.substr(1);
        }
        if (regExAsStr.charAt(regExAsStr.length - 1) === "/") {
          regExAsStr = regExAsStr.substr(0, regExAsStr.length - 1);
        }

        let slashCount = regExAsStr.split('/').length;

        determinant.ConfidenceScore += slashCount;
      }

      determinant.QueryKeyValuePairs.forEach((queryKeyvaluePair: IQueryKeyValuePair) => {
        let queryTest: boolean = UrlJacket.QueryStringHasKey(queryKeyvaluePair.Key);
        if (queryTest) {
          //this.Logger.LogVal('has key : ', QueryStrKey[queryKeyvaluePair.Key]);
          //this.Logger.LogVal('regex : ', queryKeyvaluePair.ValueMatch.toString());
          queryTest = this.__urlTestAgainstRegex(queryKeyvaluePair.ValueMatch, UrlJacket.GetQueryStringValueByKey(queryKeyvaluePair.Key));
        }

        passed = passed && queryTest;
        if (passed) {
          determinant.ConfidenceScore++;
        }
      });
      if (passed) {
        if (!toReturnPageDeterminator || toReturnPageDeterminator.ConfidenceScore < determinant.ConfidenceScore) {
          //this.Logger.LogAsJsonPretty('current determinant winner', determinant);
          toReturnPageDeterminator = determinant;
        }
      }
    });

    this.Logger.LogAsJsonPretty('Final determinant winner', toReturnPageDeterminator);

    return toReturnPageDeterminator;
  }

  private TestJacketAgainstRegex(regexPattern: RegExp, UrlJacket: IUrlJacket): boolean {
    return this.__urlTestAgainstRegex(regexPattern, UrlJacket.BuildFullUrlFromParts().AbsUrl);
  }

  private __urlTestAgainstRegex(regexPattern: RegExp, testee: string): boolean {
    //this.Logger.FuncStart(this.__urlTestAgainstRegex.name, regexPattern.toString());
    //this.Logger.LogVal('Testee', testee);
    let testResult: boolean = new RegExp(regexPattern).test(testee);

    //this.Logger.FuncEnd(this.__urlTestAgainstRegex.name, regexPattern.toString() + ' | ' + url + ' | ' + testResult.toString());
    return testResult;
  }

  GetScWindowType(UrlJacket: IUrlJacket): ScWindowType {
    var toReturn: ScWindowType = ScWindowType.Unknown;

    let result: IScWindowTypeDeterminator = this.RunJacketAgainstAllDeterminators(UrlJacket);
    if (!result) {
      this.ErrorHand.HandleFatalError(this.GetScWindowType.name, 'Undetermined page: ' + UrlJacket.BuildFullUrlFromParts());
    } else {
      toReturn = result.ScWindowType;
    }

    this.Logger.LogImportant(this.GetScWindowType.name + ' ' + ScWindowType[toReturn]);
    return toReturn;
  }
}