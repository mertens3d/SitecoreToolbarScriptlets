const fs = require('fs');
const vars = require('./vars');

class Helper {
  MyResources(fileName, varName) {
    console.log('-----------------------');
    console.log('s) myResources: fileName: ' + fileName + ' : ' + varName);
    var fileContent = fs.readFileSync(fileName, 'utf8');
    fileContent = fileContent.replace(/\r|\n/gi, '');
    fileContent = fileContent.replace(/"/gi, '\'');
    var toReturn = 'var ' + varName + ' = \"' + fileContent + '\";'; // + '\r\n';
    //console.log(toReturn);
    console.log('e) myResources');
    return (toReturn);
  };

  CleanHtml(PopUpWithVar) {
    PopUpWithVar = PopUpWithVar.replace(/<!doctype html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<head>.*<\/head>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<body>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<\/body>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<script.*\/script>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<\/html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/>\s*?</gi, '><');

    return PopUpWithVar
  }

  GetInjectData(vars) {
    var cssToInjectWithVar = this.MyResources(  vars.PopUpStyles.AutoBuildRoot + vars.PopUpStyles.MinFileName(), vars.PopUpStyles.VarName);

    var PopUpWithVar = this.MyResources(vars.PopUpHtml.AutoBuildRoot + vars.PopUpHtml.MinFileName(), vars.PopUpHtml.VarName);
    PopUpWithVar = this.CleanHtml(PopUpWithVar);

    var jsContentTopWithVar = this.MyResources(vars.ContentTopJs.AutoBuildRoot + vars.ContentTopJs.MinFileName(), vars.ContentTopJs.VarName);

    return {
      'cssToInjectWithVar': cssToInjectWithVar,
      'PopUpWithVar': PopUpWithVar,
      'jsContentTopWithVar': jsContentTopWithVar
    }
  }
}

module.exports = Helper;