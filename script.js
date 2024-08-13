document.getElementById('fetchButton').addEventListener('click', function() {
    const year = document.getElementById('yearInput').value;

    if (year) {
        fetch(`https://ergast.com/api/f1/${year}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displaySchedule(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        alert('Please enter a year.');
    }
});

function displaySchedule(data) {
    const series = 'F1';
    const season = data.MRData.RaceTable.season;
    const races = data.MRData.RaceTable.Races;
    const totalResults = races.length;

    document.getElementById('series').textContent = `Series: ${series}`;
    document.getElementById('season').textContent = `Season: ${season}`;
    document.getElementById('totalResults').textContent = `Total number of results: ${totalResults}`;

    const scheduleBody = document.getElementById('scheduleBody');
    scheduleBody.innerHTML = '';

    races.forEach(race => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${season}</td>
            <td>${race.round}</td>
            <td>${race.raceName}</td>
            <td>${race.date}</td>
            <td>${race.time || 'N/A'}</td>
            <td>${race.Circuit.Location.country}</td>
            <td><a href="${race.url}" target="_blank">Link</a></td>
        `;

        scheduleBody.appendChild(row);
    });
}
