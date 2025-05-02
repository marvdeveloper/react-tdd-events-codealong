import { useState } from "react";

function App() {
  // State to keep track of the toppings
  const [toppings, setToppings] = useState(["Cheese"]);
  const [isPepperoniChecked, setIsPepperoniChecked] = useState(false);

  const handlePepperoniChange = () => {
    // Toggle the topping when the checkbox is clicked
    if (isPepperoniChecked) {
      setToppings(toppings.filter((topping) => topping !== "Pepperoni"));
    } else {
      setToppings([...toppings, "Pepperoni"]);
    }
    setIsPepperoniChecked(!isPepperoniChecked);
  };

  return (
    <div>
      <h1>Customize Your Pizza</h1>
      <label>
        <input
          type="checkbox"
          checked={isPepperoniChecked}
          onChange={handlePepperoniChange}
        />
        Add Pepperoni
      </label>

      <h2>Toppings:</h2>
      <ul>
        {toppings.map((topping, index) => (
          <li key={index}>{topping}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
