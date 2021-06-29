import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";
import { IScIcon } from "../../../../../../../Shared/scripts/Interfaces/Data/IScIcon";
import { UrlJacket } from "../../../../../../../DOMJacket/scripts/UrlJacket";
import { IUrlJacket } from "../../../../../../../Shared/scripts/Interfaces/IUrlAgent";
import { SharedConst } from "../../../../../../../Shared/scripts/SharedConst";
import { ScIconPath } from "../../../../../../../Shared/scripts/Enums/60 - ScIconPath";

export class IConResolver extends _APICoreBase {
  ResolveIconData(mainIconSrc: string): IScIcon {
    let toReturn: IScIcon = this.DefaultScIcon();

    let urlJacket: IUrlJacket = new UrlJacket(this.ApiCore, mainIconSrc);
    let relativePath = urlJacket.BuildFullUrlFromParts().RelativeUrl;

    if (false) {
    }

    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCacheApplications16x16)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCacheApplications16x16, '');
      toReturn.Path = ScIconPath.IconCacheApplications16x16;
    }

    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCacheOffice16x16)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCacheOffice16x16, '');
      toReturn.Path = ScIconPath.IconCacheOffice16x16;
    }

    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCachePeople16x16)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCachePeople16x16, '');
      toReturn.Path = ScIconPath.IconCachePeople16x16;
    }

    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCacheSoftware16x16)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCacheSoftware16x16, '');
      toReturn.Path = ScIconPath.IconCacheSoftware16x16;
    }

    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconCache)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconCache, '');
      toReturn.Path = ScIconPath.IconCache;
    }
    else if (relativePath.startsWith(SharedConst.Const.UrlRelativePrefix.IconShellStandardMedia)) {
      toReturn.Suffix = relativePath.replace(SharedConst.Const.UrlRelativePrefix.IconShellStandardMedia, '');
      toReturn.Path = ScIconPath.StandardMedia;
    }

    else {
      toReturn.Suffix = relativePath;
      toReturn.Path = ScIconPath.Unknown;
    }

    return toReturn;
  }

  ResolveIconPath(itemIconSource: IScIcon): string {
    let toReturn: string;
    //.BuildFullUrlFromParts().AbsUrl.toString()
    if (false) {
    }
    else if (itemIconSource.Path === ScIconPath.Unknown) { toReturn = itemIconSource.Suffix; }
    else if (itemIconSource.Path === ScIconPath.IconCache) { toReturn = SharedConst.Const.UrlRelativePrefix.IconCache + itemIconSource.Suffix; }
    else { this.ErrorHand.HandleFatalError([IConResolver.name, this.ResolveIconPath.name], 'unaccounted for iconPath type'); }

    return toReturn;
  }

  DefaultScIcon(): IScIcon {
    return {
      Suffix: '',
      Path: ScIconPath.Unknown,
    };
  }
}