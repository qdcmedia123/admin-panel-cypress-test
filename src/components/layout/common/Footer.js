import React from "react";
import { formateDate } from "core-functions/getReadbledate";

function App() {
  return (
    <div id="wrapper1">
      <div className="admin-footer-1">
        <h1 className="under_title_block">
          Wealthface@{formateDate(new Date())}
        </h1>
      </div>
    </div>
  );
}

export default App;
