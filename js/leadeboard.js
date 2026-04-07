const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || `[]`);

leaderboard.sort((a, b) => b.totalPaid - a.totalPaid);

const rankingsList = document.querySelector('.rankings-list');
rankingsList.innerHTML = '';

if (leaderboard.length === 0) {
    rankingsList.innerHTML = '<p class="empty-message">No duels yet!! Go play!! 🎰</p>';
    return;

}

leaderboard.forEach ((player, index) => {
    const row = document.createElement('div');
    row.classList.add('rank-row');

    row.innerHTML = `
        <div class="rank-number">#${index + 1} </div>
        <div class="rank-avatar">👤</div>
        <div class="rank-username">${player.name}</div>
        <div class="rank-stats">W:${player.wins} L:${player.losses}</div>
        <div class="rank-mock">$${player.totalPaid.toFixed(2)} paid</div>
        `;

        rankingsList.appendChild(row)
})

const podiumPlayers = leaderboard.slice(0,3);
const podiumOrder = [1, 0, 2];
const podiumCards = document.querySelectorAll('.shame-card');

podiumOrder.forEach((playerIndex, cardIndex) => {
    const player = podiumPlayers[playerIndex];
    const card = podiumCards[cardIndex];

    if (player) {
        card.querySelector('.shame-username').textContent = player.name;
        card.querySelector('.shame-amount').textContent = `$${player.totalPaid.toFixed(2)} paid`;
    } else {
        card.querySelector('.shame-username').textContent = '???';
        card.querySelector('.shame-amount').textContent = '$0.00 paid';
    }
})