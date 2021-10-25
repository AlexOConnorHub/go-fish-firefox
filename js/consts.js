// helpers
let dq = (sel) => {return document.querySelector(sel);}
let dc = (tag, classes = null, text = null) => {
  let elem = document.createElement(tag);
  if (classes) {
    elem.className = classes;
  }
  if (text) {
    elem.innerHTML = text;
  }
  return elem;
}

// locate some elements
const p1Hand = dq("#p1Hand");
const p1Sets = dq("#p1Sets");
const p2Hand = dq("#p2Hand");
const p2Sets = dq("#p2Sets");
const p3Hand = dq("#p3Hand");
const p3Sets = dq("#p3Sets");
const p4Hand = dq("#p4Hand");
const p4Sets = dq("#p4Sets");
const drawPile = dq("#drawPile");