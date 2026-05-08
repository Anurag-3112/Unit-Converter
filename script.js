const units = {
  length: ["m", "km", "cm"],
  weight: ["kg", "g"],
  temp: ["C", "F"]
};

function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  from.innerHTML = "";
  to.innerHTML = "";

  units[type].forEach(unit => {
    from.innerHTML += `<option>${unit}</option>`;
    to.innerHTML += `<option>${unit}</option>`;
  });

  from.selectedIndex = 0;
  to.selectedIndex = 1;

  convert();
}

function convert() {
  const type = document.getElementById("type").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultEl = document.getElementById("result");

  if (isNaN(value)) {
    resultEl.textContent = "";
    return;
  }

  let result;
  
  if (type === "length") {
    const base = from === "km" ? value * 1000 :
      from === "cm" ? value / 100 : value;

    result = to === "km" ? base / 1000 :
      to === "cm" ? base * 100 : base;
  }

  if (type === "weight") {
    const base = from === "kg" ? value * 1000 : value;
    result = to === "kg" ? base / 1000 : base;
  }

  if (type === "temp") {
    if (from === to) {
      result = value;
    } else if (from === "C" && to === "F") {
      result = (value * 9 / 5) + 32;
    } else if (from === "F" && to === "C") {
      result = (value - 32) * 5 / 9;
    }
  }

  resultEl.textContent = `${value} ${from} = ${result.toFixed(2)} ${to}`;
}

populateUnits();