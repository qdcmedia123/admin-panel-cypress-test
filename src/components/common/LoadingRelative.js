import React from "react";
import Loading from "assets/img/log-loading.gif";

function App() {
  return (
    <div className="middel__of__screen__relative" role="document">
      <img alt="Wealthface" src={Loading} className="loader__small" />
    </div>
  );
}

export default App;
