exports.globalSendRes = (res, status, msg) => {
    return res.status(status || 500).send(msg || "서버 내부 에러");
};

exports.genRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.addOrRemoveArr = (arr, val) => {
  if(arr.length > 0 && arr[0] === "") { arr.shift(); } //""에 대해 split(",") 실행 시 [""]가 반환되는 케이스 처리

  let i = arr.indexOf(val);
  if(i !== -1) {
    arr = arr.slice(0, i).concat(arr.slice(i + 1));
  } else {
    arr.push(val);
  }
  return arr;
}