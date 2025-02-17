document.addEventListener('DOMContentLoaded', () => {
    initAutocomplete();

    const matchForm = document.getElementById('matchForm');
    if (matchForm) {
        matchForm.addEventListener('submit', handleSubmit);
    }
});

function initAutocomplete() {
    const femalePlaceInput = document.getElementById('femalePlace');
    const malePlaceInput = document.getElementById('malePlace');

    const femaleAutocomplete = new google.maps.places.Autocomplete(femalePlaceInput);
    const maleAutocomplete = new google.maps.places.Autocomplete(malePlaceInput);

    femaleAutocomplete.addListener('place_changed', () => {
        const place = femaleAutocomplete.getPlace();
        if (place.geometry) {
            document.getElementById('femaleLatitude').value = place.geometry.location.lat();
            document.getElementById('femaleLongitude').value = place.geometry.location.lng();
        }
    });

    maleAutocomplete.addListener('place_changed', () => {
        const place = maleAutocomplete.getPlace();
        if (place.geometry) {
            document.getElementById('maleLatitude').value = place.geometry.location.lat();
            document.getElementById('maleLongitude').value = place.geometry.location.lng();
        }
    });
}

async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
        female: {
            year: parseInt(document.getElementById('femaleYear').value),
            month: parseInt(document.getElementById('femaleMonth').value),
            date: parseInt(document.getElementById('femaleDate').value),
            hours: parseInt(document.getElementById('femaleHours').value),
            minutes: parseInt(document.getElementById('femaleMinutes').value),
            seconds: 0,
            latitude: parseFloat(document.getElementById('femaleLatitude').value),
            longitude: parseFloat(document.getElementById('femaleLongitude').value),
            timezone: 5.5
        },
        male: {
            year: parseInt(document.getElementById('maleYear').value),
            month: parseInt(document.getElementById('maleMonth').value),
            date: parseInt(document.getElementById('maleDate').value),
            hours: parseInt(document.getElementById('maleHours').value),
            minutes: parseInt(document.getElementById('maleMinutes').value),
            seconds: 0,
            latitude: parseFloat(document.getElementById('maleLatitude').value),
            longitude: parseFloat(document.getElementById('maleLongitude').value),
            timezone: 5.5
        },
        config: {
            observation_point: "topocentric",
            language: "hi",
            ayanamsha: "lahiri"
        }
    };

    try {
        const response = await fetch('/api/match-making', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        localStorage.setItem('matchResults', JSON.stringify(data));
        window.location.href = 'results.html';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the results. Please try again.');
    }
}
