import { ROWS, COLS } from "../configuration/config";

export default class FieldFillService {
  constructor() {
    this.rows = ROWS;
    this.columns = COLS;
    this.field = new Array(this.rows)
      .fill(0)
      .map((_) => new Array(this.columns).fill(0));
    this.findingNeighbors = this.findingNeighbors.bind(this);
  }
  init() {
    return this.field;
  }
  random() {
    let randomField = [];
    for (let i = 0; i < this.rows; i++) {
      randomField[i] = [];
      for (let j = 0; j < this.rows; j++) {
        randomField[i][j] = Math.round(Math.random());
      }
    }
    return randomField;
  }
  findingNeighbors(myArray, y, x) {
    let count = 0;
    for (let i = Math.max(0, y - 1); i < Math.min(this.rows, y + 2); i++)
      for (let j = Math.max(0, x - 1); j < Math.min(this.columns, x + 2); j++) {
        if (i === y && j === x) continue;
        if (myArray[i][j] === 1) count++;
      }
    if (myArray[y][x] === 1) {
      if (count > 3 || count < 2) return 0;
      return 1;
    } else {
      if (count === 3) return 1;
      return 0;
    }
  }
  updateFn(oldArr) {
    return new Promise((resolve) => {
      let newArr = [];
      for (let y = 0; y < COLS; y++) {
        newArr[y] = [];
        for (let x = 0; x < ROWS; x++) {
          newArr[y][x] = this.findingNeighbors(oldArr, y, x);
        }
      }
      console.log("tick");
      resolve([...newArr]);
    });
  }
}
