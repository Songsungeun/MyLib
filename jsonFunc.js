// OriginJson > ModifiedJson 수정된 부분 찾는 함수
/**
 * @author: Song sungeun,
 * @param {object} originJson
 * @param {object} modifiedJson (comparison Json)
   @description get the modified data from target Json
   @returns {object || boolean} modified data object(json Type) or false(if. same json)
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
 */
const jsonSortByKey = (jsonData) => {
  // key to keyArray
  let keyArr = Object.keys(jsonData), sortedObject = {};
  // sort
  keyArr.sort((current, next) => {
    let currentString = current.toUpperCase();
    let nextString = next.toUpperCase();

    if (currentString < nextString) return -1;
    if (currentString > nextString) return 1;
    return 0;
  });

  keyArr.forEach((key) => {
    sortedObject[key] = jsonData[key];
  })


  // Todo
  // 현재는 1depth만. nDepth기능까지 확장
  return sortedObject;
}

export { compareJson, jsonArrSort, jsonSortByKey };

// let tmp = { v: 1, c: 3, e: 4, h: 1, b: 6 };
// console.log(jsonSortByKey(tmp));