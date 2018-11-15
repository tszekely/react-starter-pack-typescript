import * as React from "react";
import { hot } from "react-hot-loader";

import * as style from "./App.scss";

var x = 1;

const App: React.SFC = () => (
  <div className={style.app}>
    <h1 className={style.title}>Hello world</h1>
    <p className={style.body}>
      <i className="icon-search" />
      It is I, React app.
    </p>
  </div>
);

export default hot(module)(App);
