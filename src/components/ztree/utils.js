/**
 * Created by haha on 2017/5/15.
 */

/* eslint-disable*/

var clone = function (obj) {
  if (obj == null || typeof obj != "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date().setTime(obj.getTime());
  }

  if (obj instanceof Array) {
    var copy = [];
    for (var i=0; i<obj.length; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    var copy = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = clone(obj[key]);
      }
    }
    return copy;
  }
};

var flattenToTree = function (arr) {
  var tree = [];
  var noMatch = [];
  for(let i=0; i<arr.length; i++) {
    if (arr[i].pid == 0||!arr[i].pid) {
      tree.push(arr[i]);
    } else {
      let target = findIt(tree, arr[i]);
      if (target) {
        if (!target.children) {
          target.children = [];
        }
        target.children.push(arr[i]);
      } else {
        noMatch.push(arr[i]);
      }
    }
  }
  while (noMatch.length > 0) {
    for (let i=0; i< noMatch.length; i++) {
      let target = findIt(tree, noMatch[i]);
      if (target) {
        if (!target.children) {
          target.children = [];
        }
        target.children.push(noMatch[i]);
        noMatch.splice(i, 1);
      }
    }
  }
  return tree;
}

function findIt(arr, target) {
  for(let i=0; i<arr.length; i++) {
    if (arr[i].id === target.pid) {
      return arr[i];
    }
    if (arr[i].children && arr[i].children.length > 0) {
      let ok = findIt(arr[i].children, target);
      if(ok)
        return ok;
    }
  }
  return null;
}

export default {
  clone: clone,
  flattenToTree: flattenToTree
}
