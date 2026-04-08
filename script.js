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
    card.className = "bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-center hover:border-[#45a29e]/40 hover:bg-white/[0.07]";

    card.innerHTML = `
      <h3 class="mb-3 text-sm font-bold text-[#45a29e] font-['Space_Mono'] tracking-wide">${neo.name}</h3>
      <p><strong>Date:</strong> ${approach.close_approach_date}</p>
      <p><strong>Diameter:</strong> ${diameterKm.estimated_diameter_min.toFixed(3)} - ${diameterKm.estimated_diameter_max.toFixed(3)} km</p>
      <p><strong>Miss Distance:</strong> ${parseFloat(approach.miss_distance.kilometers).toFixed(0)} km</p>
      <p><strong>Velocity:</strong> ${parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
      <p class="hazard mt-2 ${isHazardous ? 'danger text-[#f87171] font-bold' : 'safe text-[#4ade80] font-bold'}">
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
  const enday = document.querySelector('#enDay').value.padStart(2, '0');
  const enmonth = document.querySelector('#enMonth').value.padStart(2, '0');
  const enyear = document.querySelector('#enYear').value
  const stDate = `${year}-${month}-${day}`;
  const enDate = `${enyear}-${enmonth}-${enday}`;
  
  const diff = (new Date(enDate) - new Date(stDate)) / (1000 * 60 * 60 * 24);
  const container = document.querySelector('.data');

  if (diff > 7) {
    container.innerHTML = `<p class="text-red-400 font-bold col-span-full text-center py-10">⚠️ Date range cannot exceed 7 days. Please select a smaller range.</p>`;
    return;
  }

  if (diff < 0) {
    container.innerHTML = `<p class="text-red-400 font-bold col-span-full text-center py-10">⚠️ End date cannot be before start date.</p>`;
    return;
  }
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