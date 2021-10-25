//let pID = 3

let setID = (playerID) => {
  browser.storage.sync.set({
    ID: playerID
  });
  console.log(`ID stored: ${playerID}`);
}
let getID = () => {
  var item = browser.storage.sync.get('ID');
  item.then((res) => {
    console.log(`ID retrieved: ${res.ID}`)
    return res.ID;
  });
}