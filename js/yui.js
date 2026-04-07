const quotes = [
    "Did you really think today was the day?? How cute...",
    "9,847 wins. You're number 9,848.",
    "The wheel doesn't lie. Unfortunately for you.",
    "Pathetic.. But entertaining.",
    "The audacity. I respect it. Still it won't help you.",
    "5,000 years of this, You'd think they'd learn.",
    "Try again. I enjoy this.",
    "Almost, Not really. But almost."
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const yuiQuote = document.getElementById('yui-quote');
yuiQuote.textContent = quotes[randomIndex];

document.getElementById('btn-challenge-yui').addEventListener('click', () => {
    localStorage.setItem('opponent', 'Yui');
    localStorage.setItem('isYuiDuel', 'true');
    localStorage.setItem('billAmount', '500');
    window.location.href = 'duel.html';
});