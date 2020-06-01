import { UrlParts } from "./UrlParts";
import { IScMode } from "./IscMode";
import { ICurrStateContent } from "./ICurrState";
import { scWindowType } from "../Enums/scWindowType";

export interface IUrlHelper {
    CalcPageTypeFromHref(arg0: { AbsUrl: string; }): scWindowType;
    SetFilePathFromWindowType(UrlParts: UrlParts, desiredPageType: scWindowType): UrlParts;
    SetScModeFromEditPrevNorm(newValue: IScMode, UrlParts: UrlParts): UrlParts;
    BuildFullUrlFromParts(newUrlParts: any);
    BuildEditPrevNormUrl(newValue: IScMode, contState: ICurrStateContent, UrlParts: UrlParts): any;
    CloneUrlParts(UrlParts: UrlParts);
    MakeUrlParts(arg0: { AbsUrl: string; }): UrlParts;
}
