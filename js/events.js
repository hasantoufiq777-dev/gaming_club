async function loadEvents() {
  const list = document.getElementById('events-list');
  const filterBar = document.getElementById('event-filters');
  if (!list || !filterBar) return;

  try {
    const response = await fetch('data/events.json');
    const events = await response.json();

    const games = ['All', ...new Set(events.map((event) => event.game))];

    filterBar.innerHTML = games
      .map(
        (game, index) =>
          `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-game="${game}">${game}</button>`
      )
      .join('');

    function renderCards(selectedGame = 'All') {
      const filtered =
        selectedGame === 'All'
          ? events
          : events.filter((event) => event.game === selectedGame);

      list.innerHTML = filtered
        .map(
          (event) => `
            <article class="card event-card reveal">
              <h4>${event.title}</h4>
              <p class="event-meta">${event.game} | ${event.date}</p>
              <p>${event.description}</p>
            </article>
          `
        )
        .join('');

      document.querySelectorAll('.event-card').forEach((card, index) => {
        card.style.animation = `fadeUp 0.45s ease ${index * 70}ms both`;
      });
    }

    renderCards();

    filterBar.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;

      filterBar.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderCards(button.dataset.game);
    });
  } catch (error) {
    list.innerHTML = '<p>Unable to load events right now.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadEvents);