// OriginJson > ModifiedJson 수정된 부분 찾는 함수
const compareJson = (originJson, modifiedJson) => {
  let differencedValues = {};

  for (let key in modifiedJson) {
    // new key ? insert : next
    if (!originJson.hasOwnProperty(key)) {
      differencedValues[key] = modifiedJson[key];
      continue;
    }

    // hasKey => jsonType ? recursive call : insert
    if (originJson[key] !== modifiedJson[key]) {

      try {
        if (originJson[key].constructor === Object && modifiedJson[key].constructor === Object) {
          differencedValues[key] = compareJson(originJson[key], modifiedJson[key]);
          continue;
        }
        differencedValues[key] = modifiedJson[key];
      } catch (e) {
        differencedValues[key] = modifiedJson[key];
      }
    }
  }
  return differencedValues;
};
