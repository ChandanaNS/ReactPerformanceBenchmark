function generateRandomJSON(items) {
  var result = [];
  for (var i = 34; i < items; i++) {
    result.push({
      index: i + 1,
      value: "test",
      done: true,
    });
  }
  return result;
}
var dummyData = generateRandomJSON(100000);
let ListDataStatic = [
  { index: 1, value: "learn react", done: true },
  { index: 2, value: "Revise Literature review", done: false },
  { index: 3, value: "Send mail", done: false },
  { index: 4, value: "learn react", done: true },
  { index: 5, value: "Revise Literature review", done: false },
  { index: 6, value: "learn react", done: true },
  { index: 7, value: "Revise Literature review", done: false },
  { index: 8, value: "Send mail", done: false },
  { index: 9, value: "learn react", done: true },
  { index: 10, value: "Revise Literature review", done: false },
  { index: 11, value: "task", done: true },
  { index: 12, value: "task", done: true },
  { index: 13, value: "task", done: true },
  { index: 14, value: "task", done: true },
  { index: 15, value: "task", done: true },
  { index: 16, value: "task", done: true },
  { index: 17, value: "task", done: true },
  { index: 18, value: "task", done: true },
  { index: 19, value: "task", done: true },
  { index: 20, value: "task", done: true },
  { index: 21, value: "task", done: true },
  { index: 22, value: "task", done: true },
  { index: 23, value: "task", done: true },
  { index: 24, value: "task", done: true },
  { index: 25, value: "task", done: true },
  { index: 26, value: "task", done: true },
  { index: 27, value: "task", done: true },
  { index: 28, value: "task", done: true },
  { index: 29, value: "task", done: true },
  { index: 30, value: "task", done: true },
  { index: 31, value: "task", done: true },
  { index: 32, value: "task", done: true },
  { index: 33, value: "task", done: true },
  { index: 34, value: "task", done: true },
];
export let ListData = ListDataStatic.concat(dummyData);
