const themeDots = document.querySelectorAll('.theme-dot ')

themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
     const theme = dot.dataset.theme 

     themeDots.forEach(d => d.classList.remove('active'))

     dot.classList.add('active')

    if (theme === 'default'){
        document.documentElement.removeAttribute('data-theme')
        localStorage.removeItem('theme')
    } else {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }
    })
})

const wins = parseInt(localStorage.getItem('wins')) || 0;
const losses = parseInt(localStorage.getItem('losses')) || 0;
const totalGames = parseInt(localStorage.getItem('totalGames')) || 0;
const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

document.getElementById('stat-games').textContent = totalGames;
document.getElementById('stat-wins').textContent = wins;
document.getElementById('stat-losses').textContent = losses;
document.getElementById('stat-winrate').textContent = `${winRate}%`;

const totalPaid = parseFloat(localStorage.getItem('totalPaid')) || 0;
document.getElementById('stat-paid').textContent = `$${totalPaid.toFixed(2)}`;
