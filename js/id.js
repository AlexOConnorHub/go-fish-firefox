let uuid;
// retrieves or generates uuid
let getID = async () => {
  var item = browser.storage.sync.get('uuid');
  item.then((res) => {
    if (res.uuid == undefined) {
      console.log(`ID not retrieved: ${res.ID}`);
      newuuid();
    } else {
      console.log(`ID retrieved: ${res.uuid}`);
      uuid = res.uuid;
    }
    main();
  })
} // generates new uuid
let newuuid = () => {
  uuid = uuidv4();
  console.log(`generated uuid ${uuid}`)
  setID();
} // stores the uuid
let setID = () => {
  browser.storage.sync.set({
    uuid
  });
  console.log(`ID stored: ${uuid}`);
} // removes id (theoretically)
let rmID = () => {
  browser.storage.sync.remove({
    uuid
  });
  console.log(`ID deleted`);
}