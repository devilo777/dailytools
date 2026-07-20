const unitsData = {
    length: { meter: 1, kilometer: 1000, mile: 1609.34, foot: 0.3048 },
    weight: { gram: 1, kilogram: 1000, pound: 453.592, ounce: 28.3495 }
};

const categorySelect = document.getElementById('converterCategory');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');

function populateUnits() {
    if(!categorySelect) return;
    const cat = categorySelect.value;
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    Object.keys(unitsData[cat]).forEach(unit => {
        fromUnit.options[fromUnit.options.length] = new Option(unit.toUpperCase(), unit);
        toUnit.options[toUnit.options.length] = new Option(unit.toUpperCase(), unit);
    });
    
    if(toUnit.options.length > 1) toUnit.selectedIndex = 1;
    performConversion();
}

function performConversion() {
    if(!categorySelect) return;
    const cat = categorySelect.value;
    const val = parseFloat(fromValue.value);
    if(isNaN(val)) return toValue.value = '';

    const fromRate = unitsData[cat][fromUnit.value];
    const toRate = unitsData[cat][toUnit.value];

    const valueInBase = val * fromRate;
    const finalValue = valueInBase / toRate;

    toValue.value = Number(finalValue.toFixed(6));
}

if(categorySelect) {
    categorySelect.addEventListener('change', populateUnits);
    fromUnit.addEventListener('change', performConversion);
    toUnit.addEventListener('change', performConversion);
    fromValue.addEventListener('input', performConversion);
    populateUnits();
}
