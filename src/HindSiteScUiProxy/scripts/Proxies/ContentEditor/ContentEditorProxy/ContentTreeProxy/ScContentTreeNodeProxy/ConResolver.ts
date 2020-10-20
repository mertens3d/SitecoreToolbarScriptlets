import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";
import { IScIcon } from "../../../../../../../Shared/scripts/Interfaces/Data/IScIcon";
import { UrlJacket } from "../../../../../../../DOMJacket/scripts/UrlJacket";
import { IUrlJacket } from "../../../../../../../Shared/scripts/Interfaces/IUrlAgent";
import { SharedConst } from "../../../../../../../Shared/scripts/SharedConst";
import { ScIconPath } from "../../../../../../../Shared/scripts/Enums/60 - ScIconPath";

export class ConResolver extends _APICoreBase {
  ResolveIconData(mainIconSrc: string): IScIcon {
    let toReturn: IScIcon = this.DefaultScIcon();

    let urlJacket: IUrlJacket = new UrlJacket(this.ApiCore, mainIconSrc);
    let relativePath = urlJacket.BuildFullUrlFromParts().RelativeUrl;

    if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCache)) {
      toReturn.IconSuffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCache, '');
      toReturn.IconPath = ScIconPath.IconCache
    }
    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconShellStandardMedia)) {
      toReturn.IconSuffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconShellStandardMedia, '');
      toReturn.IconPath = ScIconPath.StandardMedia
    }
    else {
      toReturn.IconSuffix = relativePath;
      toReturn.IconPath = ScIconPath.Unknown;
    }

    return toReturn;
  }

  ResolveIconPath(itemIconSource: IScIcon): string {
    let toReturn: string;
    //.BuildFullUrlFromParts().AbsUrl.toString()

    if (false) {
    }
    else if (itemIconSource.IconPath === ScIconPath.Unknown) { toReturn = itemIconSource.IconSuffix; }
    else if (itemIconSource.IconPath === ScIconPath.IconCache) { toReturn = SharedConst.Const.UrlRelativePrefix.IconCache + itemIconSource.IconSuffix; }
    else { this.ErrorHand.HandleFatalError([ConResolver.name, this.ResolveIconPath.name], 'unaccounted for iconPath type'); }

    return toReturn;
  }

  DefaultScIcon(): IScIcon {
    return {
      IconSuffix: '',
      IconPath: ScIconPath.Unknown,
    }
  }
}