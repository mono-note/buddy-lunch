import DataFromFirebase from './Firebase';

let syncData = () => {
  const data = DataFromFirebase.ref()
  return data.once("value", snap => {
    snap.val()
  }, error => {
    console.log(`Error: ${error.code}`);
  })
}
export default syncData;