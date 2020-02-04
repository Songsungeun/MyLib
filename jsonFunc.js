// OriginJson > ModifiedJson 수정된 부분 찾는 함수
const compareJson = (originJson, modifiedJson) => {
  let differencedValues = {};

  for (let key in modifiedJson) {
    // new key ? insert : next
    if (!originJson.hasOwnProperty(key)) {
      differencedValues[key] = modifiedJson[key];
      continue;
    }

    if (originJson[key] !== modifiedJson[key]) {
      differencedValues[key] = modifiedJson[key];
    }
  }
  return differencedValues;
};

let obj = {
  a: 1,
  b: 2,
  c: { t: 5, y: 6, z: { q: 2, w: 2, z: { a: 1, b: 2 } } },
  d: { z: 1, c: 2 },
  f: 1
};

let obj2 = {
  b: 3,
  c: { t: 5, y: 7, z: { q: 2, u: 5, z: { a: 1, b: 3, c: 4 } } },
  d: [2, 3, 4],
  e: { a: 1 },
  f: 1
};

console.log(compareJson(obj, obj2));
