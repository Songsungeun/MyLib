/**
 * @author: Song sungeun,
 * @param {Object} originJson
 * @param {Object} modifiedJson - comparison Json
 * @description get the modified data from target Json
 * @returns {Object} - modified data object(json Type) or false(if. same json)
*/
const compareJson = (originJson, modifiedJson) => {
  let differencedValues;
  let addValue = (key, nDepthValues) => {
    let insertValue = nDepthValues || modifiedJson[key];

    if (!insertValue) return;

    differencedValues = differencedValues || {};
    differencedValues[key] = insertValue;
  };

  for (let key in modifiedJson) {
    // new key ? insert : next
    if (!originJson.hasOwnProperty(key)) {
      addValue(key);
      continue;
    }

    // hasKey => jsonType ? recursive call : insert
    if (originJson[key] !== modifiedJson[key]) {

      try {
        if (originJson[key].constructor === Object && modifiedJson[key].constructor === Object) {
          let nDepthValues = compareJson(originJson[key], modifiedJson[key]);
          nDepthValues && addValue(key, nDepthValues);
          continue;
        }
        addValue(key); // object가 아닌 type들 insert (ex => Array, Number, String, etc.)
      } catch (e) {
        addValue(key); // constructor 없어서 오류나면 insert (ex => value > null, undefined > value, etc.)
      }
    }
  }
  return differencedValues ? differencedValues : false;
};

/**
 * func: sort by targetKey value
 * @author Song sungeun
 * @param {Array} jsonArr 
 * @param {String} targetKey 
 * @returns {Array} jsonArray
 */
const jsonArrSort = (jsonArr, targetKey) => {
  if (!Array.isArray(jsonArr)) throw new Error('The first parameter must be an Array in jsonSort Function');
  if (!targetKey) console.error('check the second parameter. The second parmeter is what you want to sort in jsonSort Function');

  let type = typeof jsonArr[targetKey];

  jsonArr.sort((current, next) => {
    let value, nextValue;
    value = type === 'string' ? current[targetKey].toUpperCase() : current[targetKey];
    nextValue = type === 'string' ? next[targetKey].toUpperCase() : next[targetKey];

    if (value < nextValue) return -1;
    if (value > nextValue) return 1;
    return 0;
  });

  return jsonArr;
}

/**
 * @author Song sungeun
 * @param {Object} jsonData 
 * @returns {Object} jsonData sorted by key
 * @description only 1depth key sort
 */
const jsonSortByKey = (jsonData) => {
  // key to keyArray
  let keyArr = Object.keys(jsonData), sortedObj = {};
  // sort
  keyArr.sort((current, next) => {
    let currentString = current.toUpperCase();
    let nextString = next.toUpperCase();

    if (currentString < nextString) return -1;
    if (currentString > nextString) return 1;
    return 0;
  });

  keyArr.forEach((key) => {
    sortedObj[key] = jsonData[key];
  })

  return sortedObj;
}

/**
 * @author Song sungeun
 * @param {Object} jsonData 
 * @returns {Object} jsonData deeply sorted by key
 * @description all of Ndepth key sort
 */
const jsonSortByKeyToDeep = (jsonData) => {
  let sortedObj = jsonSortByKey(jsonData);

  let getHasNdepthKey = (obj) => {
    return Object.keys(obj)
      .filter(key => obj[key] instanceof Object);
  }

  let keyArr = getHasNdepthKey(sortedObj);
  if (keyArr.length > 0) {
    keyArr.forEach(nKey => {
      sortedObj[nKey] = jsonSortByKeyToDeep(sortedObj[nKey]);
    })
  }

  return sortedObj;
}

export { compareJson, jsonArrSort, jsonSortByKey, jsonSortByKeyToDeep };

// let tmp = { v: 1, c: 3, e: 4, h: 1, b: 6, a: { d: 5, f: 7, b: 1, a: { v: 1, n: 2, a: 3 } }, b: { z: 2, y: 3, x: 4 } };
// console.log(jsonSortByKeyToDeep(tmp));