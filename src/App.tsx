import { useState } from "react";
import bg_mobile from "/images/bg-main-mobile.png";

function App() {
  return (
    <div className="h-screen w-screen">
      <div>
        <img src={bg_mobile} />
      </div>
      <div>
        <h4>Cardholder Name</h4>
        <input type="text" placeholder="e.g. Jane Appleseed" />
      </div>
      <div>
        <h4>Card Number</h4>
        <input type="text" placeholder="e.g. 1234 5678 9123 0000"></input>
      </div>
      <div>
        <h4>Exp. Date (MM/YY)</h4>
        <div>
          <input type="text" placeholder="MM" />
          <input type="text" placeholder="YY" />
        </div>
        <div>
          <h4>CVC</h4>
          <input type="text" placeholder="e.g. 123" />
        </div>
      </div>
      <button type="submit" />
    </div>
  );
}

export default App;
