var xyyz = xyyz || {};

xyyz.OneTree = {
    WalkNodeRecursive: function (targetNode, depth) {
        // xyyz.debug.Log('WalkNodeRecursive ' + depth);
        var toReturn = [];
        depth = depth - 1;

        if (targetNode) {
            var id = targetNode.id;
            var className = targetNode.className;
            // xyyz.debug.Log('class: ' + className);
            if (className === xyyz.InjectConst.ClassNames.ContentTreeNode) {
                var firstImg = targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng) > -1) {
                        xyyz.debug.Log('src: ' + srcAttr);
                        toReturn.push(firstImg.id);
                    }
                }
            }

            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    },
    GetOneLiveTreeData: function (idx, targetDoc) {
        xyyz.debug.FuncStart( this.GetOneLiveTreeData.name + ' idx: ' + idx);

        if (targetDoc) {
            xyyz.debug.Log(JSON.stringify( targetDoc));
            var rootNode = targetDoc.getElementById(xyyz.InjectConst.Selector.RootNodeId);
            
            
            if (rootNode) {
                xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;

                var foundNodesAr = this.WalkNodeRecursive(rootParent, xyyz.InjectConst.MaxIter);
              xyyz.debug.Log('foundNodes count: ' + foundNodesAr.length);

              var nodesAsString = JSON.stringify(foundNodesAr);
              xyyz.debug.Log('foundNodesAr as string: ' + foundNodesAr);

              


            } else {
                xyyz.debug.Error( this.GetOneLiveTreeData.name  + 'no root node');
                
            }
        }else{
            xyyz.debug.Error( this.GetOneLiveTreeData.name  + ' no targetDoc');
            
        }
        xyyz.debug.FuncEnd( this.GetOneLiveTreeData.name );

    },

};