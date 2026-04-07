const friendCards = document.querySelectorAll('.friend-card');
const popup = document.getElementById('friend-popup');
const popupName = document.querySelector('.popup-name');
const btnClose = document.querySelector('.btn-close');

friendCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('.friend-name').textContent;
        popupName.textContent = name;
        popup.classList.remove('hidden');
    });
});

btnClose.addEventListener('click', () =>{
    popup.classList.add('hidden');
});

const billInput = document.getElementById('bill-input');
const btnLever = document.querySelector('.btn-lever');

btnLever.addEventListener('click', () => {
    const amount = parseFloat(billInput.value);

    if (billInput.value === '') {
        alert('Please enter a bill amount');
        return
    }

    if (amount <= 0 || isNaN(amount)) {
        alert('PLease enter a valid amount!!')
        return;
    }

    localStorage.setItem('billAmount', amount.toFixed(2));
    alert('Bill set to $' + amount.toFixed(2) + '!!');
});

const btnDuel = document.querySelector('.btn-duel');

btnDuel.addEventListener('click', () => {
    const bill = localStorage.getItem('billAmount');

    if (!bill){
        alert('Please enter a bill amount first!!');
        return
    }

    const opponent = popupName.textContent;
    localStorage.setItem('opponent', opponent);
    window.location.href = 'duel.html';
});