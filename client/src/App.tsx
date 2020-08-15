import React from "react";

import "./App.css";
import { Search } from "./features/search/Search";
import { Viewer } from "./features/Viewer/Viewer";
function App() {
  return (
    <div className="App">
      <header className="App-header">Elmo HR Twitter Api</header>
      <Search />
      <Viewer />
    </div>
  );
}

export default App;
