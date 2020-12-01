import { useEffect, useState } from "react";
import { db } from "./services/firebase";

function App() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    db.collection("Home").doc('1').get().then(u => setInfo(u.data()));
  }, [])

  console.log(info);

  return (
    <>
    </>
  );
}

export default App;
