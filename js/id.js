let uuid;
// retrieves or generates uuid
let getID = async () => {
  var item = browser.storage.sync.get('uuid');
  item.then((res) => {
    if (res.uuid == undefined) {
      newuuid();
    } else {
      uuid = res.uuid;
    }
    main();
  })
} // generates new uuid
let newuuid = () => {
  uuid = uuidv4();
  setID();
} // stores the uuid
let setID = () => {
  browser.storage.sync.set({
    uuid
  });
} // removes id (theoretically)
let rmID = () => {
  browser.storage.sync.remove({
    uuid
  });
}