let allAsteroids = [];

const fetchData = async (stDate, enDate) => {
  const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${stDate}&end_date=${enDate}&api_key=QYGRupebWsaJ9U0hmSKHvgahKNd5uUgkOKuWexcK`);
  const data = await response.json();
  allAsteroids = Object.values(data.near_earth_objects).flat();
  renderCards(allAsteroids)
};

const renderCards = (asteroids) => {
  const container = document.querySelector(".data");
  container.innerHTML = ""; 

  asteroids.forEach(neo => {
    const approach = neo.close_approach_data[0];
    const diameterKm = neo.estimated_diameter.kilometers;
    const isHazardous = neo.is_potentially_hazardous_asteroid;

    const card = document.createElement("div");
    card.classList.add("neo-card");

    card.innerHTML = `
      <h3>${neo.name}</h3>
      <p><strong>Date:</strong> ${approach.close_approach_date}</p>
      <p><strong>Diameter:</strong> ${diameterKm.estimated_diameter_min.toFixed(3)} - ${diameterKm.estimated_diameter_max.toFixed(3)} km</p>
      <p><strong>Miss Distance:</strong> ${parseFloat(approach.miss_distance.kilometers).toFixed(0)} km</p>
      <p><strong>Velocity:</strong> ${parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
      <p class="hazard ${isHazardous ? 'danger' : 'safe'}">
        ${isHazardous ? "⚠️ Potentially Hazardous" : "✅ Not Hazardous"}
      </p>
    `;

    container.appendChild(card);
  });
}

let go = document.querySelector('.getall');
go.addEventListener('click', () => {
  const day = document.querySelector('#day').value.padStart(2, '0');
  const month = document.querySelector('#month').value.padStart(2, '0');
  const year = document.querySelector('#year').value
  const stDate = `${year}-${month}-${day}`;
  const enDate = `${year}-${month}-${day}`;
  fetchData(stDate, enDate);
});

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', (e) => {
  const text = e.target.value.toLowerCase();
  const filtered = allAsteroids.filter((neo) => {
    return neo.name.toLowerCase().includes(text);
  })
  renderCards(filtered);
})

const filterSelect = document.querySelector('#filter-select');
filterSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  let filtered;
  if (value === 'hazardous') {
    filtered = allAsteroids.filter(neo => neo.is_potentially_hazardous_asteroid === true);
  } else if (value === 'safe') {
    filtered = allAsteroids.filter(neo => neo.is_potentially_hazardous_asteroid === false);
  } else {
    filtered = allAsteroids;
  }

  renderCards(filtered);
})

const sortSelect = document.querySelector('#sort-select');
sortSelect.addEventListener('change', (e) => {
  const value = e.target.value;

  let sorted = [...allAsteroids];

  if (value === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === 'size') {
    sorted.sort((a, b) => b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max);
  } else if (value === 'speed') {
    sorted.sort((a, b) => parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_hour) - parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour));
  }

  renderCards(sorted);
});
// let strData = JSON.stringify(data);
// para.innerText = data.near_earth_objects;