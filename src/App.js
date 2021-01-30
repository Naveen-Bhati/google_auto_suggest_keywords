import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  var [Sitem, setSitem] = useState("");
  var [result, setResult] = useState([]);
  var ChangeHandler = (e) => {
    setSitem(e.target.value);
  };
  useEffect(() => {
    async function autoSearch() {
      var res = await axios.get(
        `http://suggestqueries.google.com/complete/search?client=chrome&q=${Sitem}&hl=en`
      );
      var resultArr = res.data[1];
      if (resultArr.length !== 0) {
        setResult((result = resultArr));
      }
    }
    autoSearch();
  }, [Sitem]);

  if (Sitem.length !== 0) {
    document.getElementById("sItem").style.display = "flex";
  }

  return (
    <div className="App">
      <div className="searchBar">
        <input
          type="text"
          onChange={ChangeHandler}
          placeholder="Search Google"
        />
        <h1 id="sItem" className="sItem">
          {Sitem}
        </h1>

        {Sitem.length !== 0 ? result.map((e) => <h1>{e}</h1>) : null}
      </div>
    </div>
  );
}

export default App;
