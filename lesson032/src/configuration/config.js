export const UPDATE_INTERVAL = 400;

export const ROWS = 50; //count of rows
export const COLS = 50; //count of coll
export const cH = (window.innerHeight / ROWS) * 0.5; //height
export const cW = (window.innerHeight / COLS) * 0.5; //width
export const cM = 1; //margin
export const cB = 1; //border
export const COLORS = ["#FE86FF", "#FD2BFF", "#C202D3", "#5E0FFF", "#1905D9"];
export const CELL_PROPS = {
  border: `${cB}px solid black`,
  margin: `${cM}px`,
  height: `${cH}px`,
  width: `${cW}px`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const CARD_PROPS = {
  height: `${COLS * (cH + 2 * cB) + 128}px`,
  width: `${ROWS * (cW + 2 * cB) + 128}px`,
};
export const FIELD_PROPS = {
  display: "flex",
  flexWrap: "wrap",
  height: `${COLS * (cH + 2 * cB)}px`,
  width: `${ROWS * (cW + 2 * cB)}px`,
};
