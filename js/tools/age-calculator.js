document.getElementById('calculateAgeBtn')?.addEventListener('click', () => {
    const dobValue = document.getElementById('dobInput').value;
    if(!dobValue) {
        if(window.showToast) window.showToast("Please select a valid date!", "error");
        else alert("Please select a date!");
        return;
    }

    const dob = new Date(dobValue);
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const diffTime = Math.abs(now - dob);
    const totalDaysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalMonthsDiff = (years * 12) + months;

    document.getElementById('primaryAgeResult').innerText = `${years} Years, ${months} Months, ${days} Days`;
    document.getElementById('totalMonths').innerText = totalMonthsDiff.toLocaleString();
    document.getElementById('totalDays').innerText = totalDaysDiff.toLocaleString();
    
    document.getElementById('ageDashboard').style.display = 'grid';
    if(window.showToast) window.showToast("Age calculated successfully!");
});
