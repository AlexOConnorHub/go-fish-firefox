const tmpFiles = await IDBFiles.getFileStorage({name: "tmpFiles"});
 
const file = await tmpFiles.createMutableFile("path/filename.txt");
const fh = file.open("readwrite");

const metadata = await fh.getMetadata();
console.log(metadata.size); // -> 0

await fh.append("new file content");

const metadata = await fh.getMetadata();
console.log(metadata.size); // -> updated size

await fh.close();

await file.persist();

const fileNames = await tmpFiles.list();
console.log(fileNames); // -> ["path/filename.txt"]

const file = await tmpFiles.get("path/filename.txt");
// Only open if its a mutable file.
if (file.open) {
  const fh = file.open("readonly");
  const metadata = await fh.getMetadata();
  console.log(metadata.size); // -> updated size
}

await tmpFiles.clear(); // or tmpFiles.remove("path/filename.txt")
const fileNames = await tmpFiles.list();
console.log(fileNames); // -> []