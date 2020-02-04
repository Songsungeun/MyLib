// OriginJson > ModifiedJson 수정된 부분 찾는 함수
/* author: Song sungeun,
   func: get the modified data from target Json
   params: original Json, comparison Json
   return: modified data object(json Type) or false(if. same json)
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