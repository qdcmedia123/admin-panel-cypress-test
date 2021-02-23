import React from "react";
import Header from "components/Header";
function App() {
  function refreshPage() {
    const token = localStorage.getItem("jwtToken");
    // Hello
    if (token === null) console.log("Page reloading");
    window.location.reload();
  }

  refreshPage();
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
