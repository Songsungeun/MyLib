// OriginJson > ModifiedJson 수정된 부분 찾는 함수
const compareJson = (originJson, modifiedJson) => {
  let differencedValues = {};
  let addValue = (key) => { differencedValues[key] = modifiedJson[key]; }

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
          differencedValues[key] = compareJson(originJson[key], modifiedJson[key]);
          continue;
        }
        // object가 아닌 type들 insert (ex => Array, Number, String, etc.)
        addValue(key);
      } catch (e) {
        // constructor 없어서 오류나면 insert (ex => value > null, undefined > value, etc.)
        addValue(key);
      }
    }
  }
  return differencedValues;
};