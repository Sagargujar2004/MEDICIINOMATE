function updateStatus() {
    const afternoonPills = document.querySelector('input[name="afternoonPills"]:checked');
    const nightPills = document.querySelector('input[name="nightPills"]:checked');

    if (afternoonPills && nightPills) {
        alert(`Afternoon Pills: ${afternoonPills.value}\nNight Pills: ${nightPills.value}`);
    } else {
        alert("Please select options for both afternoon and night pills.");
    }
    
        const data = {
            afternoonPills: afternoonPills.value,
            nightPills: nightPills.value
        };
    
        fetch('http://localhost:3000/api/pill-tracker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
    
    
}
