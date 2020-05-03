import React from "react";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Search from "./components/search/Search";
import { MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <MuiThemeProvider>
      <NavBar />
      <Search />
    </MuiThemeProvider>
  );
}

export default App;
