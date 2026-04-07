const billAmount = parseFloat(localStorage.getItem('billAmount'));
const opponent = localStorage.getItem('opponent');

const playerName = document.querySelector('.player-card.left .player-name');
const opponentName = document.querySelector('.player-card.right .player-name');

playerName.textContent = 'You';
opponentName.textContent = opponent || 'Opponent';

const btnReady = document.querySelector('.btn-ready');
const faceoff = document.getElementById('faceoff');
const countdown = document.getElementById('countdown');
const countdownNumber = document.querySelector('.countdown-number');
const wheelStage = document.getElementById('wheel-stage');
const btnSpin = document.getElementById('btn-spin');
const pizzaWheel = document.getElementById('pizza-wheel');
const wheelContainer = document.querySelector('.wheel-container');
const sliceButton = document.querySelectorAll('.btn-slices');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.querySelector('.result-message');
const amountDisplay = document.querySelector('.amount-display');
const btnConfirm = document.querySelector('.btn-confirm');
const btnPlayAgain = document.querySelector('.btn-play-again');
const faceoffCenter = document.getElementById('faceoff-center');
const inlineCountdown = document.getElementById('inline-countdown');
const leftCard = document.querySelector('.player-card.left');
const rightCard = document.querySelector('.player-card.right');

const isYuiDuel = localStorage.getItem('isYuiDuel') === 'true';
if (!isYuiDuel) localStorage.removeItem('isYuiDuel');

let currentSlices = 8;

const yuiWinQuotes = [
    "...You remind me of him.",
    "Don't get used to it.",
    "Hmph. Acceptable.",
    "One win doesn't make you worthy.",
    "...Fine. You've earned this one.",
    "I let you have that one. Obviously.",
    "...Not bad. Don't make it weird.",
    "5,000 years and someone finally surprises me. Slightly.",
    "You won. I yawned. Coincidence.",
    "...I was going easy on you. But sure. Celebrate."
];

const yuiLoseQuotes = [
    "Aww. You tried so hard too. Adorable.",
    "Was that your best?? ...Okay!!",
    "I'd feel bad but I've seen this 9,847 times before. So.",
    "You spun the wheel like it owed you something. It didn't.",
    "Don't be sad!! Losing builds character. Apparently.",
    "Mmm. Nope. Better luck next century!!",
    "Honestly?? I barely paid attention and you still lost. Impressive.",
    "The wheel is not broken. You're just unlucky. There's a difference!!",
    "You have such a hopeful face before every spin. It's genuinely my favorite part.",
    "It's okay!! Money is temporary. Embarrassment is forever. 🦇"
];

let slicePercentages = [];

function generateSliceLabels(slices = 8) {
    document.querySelectorAll('.slice-label').forEach(el => el.remove());
    slicePercentages = [];
    const sliceAngle = 360 / slices;

    for (let i = 0; i < slices; i++) {
        const percent = Math.floor(Math.random() * 41) + 30;
        slicePercentages.push(percent);

        const label = document.createElement('div');
        label.classList.add('slice-label');
        label.textContent = `${percent}% / ${100 - percent}%`;
        const angle = sliceAngle * i + sliceAngle / 2;
        const isBottomHalf = angle > 360;
        label.style.rotate = `${isBottomHalf ? angle + 180 : angle}deg`;
        pizzaWheel.appendChild(label);
    }
}

function generateYuiWheel() {
    document.querySelectorAll('.slice-label').forEach(el => el.remove());
    pizzaWheel.style.background = `conic-gradient(
        #8B0000 0deg 45deg,
        #6B0000 45deg 90deg,
        #A50000 90deg 135deg,
        #7A0000 135deg 180deg,
        #B22222 180deg 225deg,
        #6B0000 225deg 270deg,
        #8B0000 270deg 315deg,
        #A50000 315deg 350deg,
        #FF80B4 350deg 360deg
    ) border-box`;

    const loseLabels = [
        { text: '💸 LOSE', angle: 22.5 },
        { text: '🦇 LOSE', angle: 67.5 },
        { text: '😭 LOSE', angle: 112.5 },
        { text: '💀 LOSE', angle: 157.5 },
        { text: '🦇 LOSE', angle: 202.5 },
        { text: '💸 LOSE', angle: 247.5 },
        { text: '😭 LOSE', angle: 292.5 },
        { text: '💀 LOSE', angle: 335 },
    ];

    loseLabels.forEach(({ text, angle }) => {
        const label = document.createElement('div');
        label.classList.add('slice-label');
        label.textContent = text;
        label.style.rotate = `${angle}deg`;
        label.style.color = '#FF9999';
        label.style.fontSize = '0.75rem';
        pizzaWheel.appendChild(label);
    });

    const winLabel = document.createElement('div');
    winLabel.classList.add('slice-label');
    winLabel.textContent = '👑 WIN';
    winLabel.style.rotate = '355deg';
    winLabel.style.fontSize = '0.8rem';
    winLabel.style.color = '#FF80B4';
    winLabel.style.fontWeight = 'bold';
    pizzaWheel.appendChild(winLabel);
}

btnReady.addEventListener('click', () => {
    faceoffCenter.classList.add('hidden');
    inlineCountdown.classList.remove('hidden');

    let count = 3;
    countdownNumber.textContent = count;
    applyCardAnimation(count);

    const timer = setInterval(() => {
        leftCard.classList.remove('card-shake', 'card-bounce', 'card-glow');
        rightCard.classList.remove('card-shake', 'card-bounce', 'card-glow');
        count--;

        if (count === 0) {
            clearInterval(timer);
            faceoff.classList.add('hidden');
            wheelStage.classList.remove('hidden');

            if (isYuiDuel) {
                generateYuiWheel();
            } else {
                currentSlices = 8;
                generateSliceLabels();
                updateWheel(8);
            }
        } else {
            countdownNumber.textContent = count;
            applyCardAnimation(count);
        }
    }, 1000);
});

function applyCardAnimation(count) {
    const animMap = { 3: 'card-shake', 2: 'card-bounce', 1: 'card-glow' };
    leftCard.classList.add(animMap[count]);
    rightCard.classList.add(animMap[count]);

    if (count === 1) {
    navigator.vibrate([200, 100, 200]);
}
}

let currentRotation = 0;

sliceButton.forEach(btn => {
    btn.addEventListener('click', () => {
        sliceButton.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const slices = btn.id === 'slices-8' ? 8 : 16;

        currentSlices = slices;

        generateSliceLabels(slices);
        updateWheel(slices);
    });
});

function updateWheel(slices) {
    const deg = 360 / slices;
    let gradient = '';
    for (let i = 0; i < slices; i++) {
        const start = deg * i;
        const end = deg * (i + 1);
        const color = i % 2 === 0 ? 'var(--accent)' : 'var(--bg-secondary)';
        gradient += `${color} ${start}deg ${end}deg, `;
    }
    pizzaWheel.style.background = `conic-gradient(${gradient.slice(0, -2)}) border-box`;
}

btnSpin.addEventListener('click', () => {
    const randomDeg = 2880 + Math.floor(Math.random() * 360);
    currentRotation += randomDeg;
    pizzaWheel.style.transform = `rotate(${currentRotation}deg)`;
    btnSpin.disabled = true;

    setTimeout(() => {
        const normalizedDeg = (360 - (currentRotation % 360)) % 360;
        const adjustedDeg = normalizedDeg;

        if (!isYuiDuel) {
            const sliceAngle = 360 /currentSlices;
            const sliceIndex = Math.floor(adjustedDeg / sliceAngle) % currentSlices;
            const yourPercent = slicePercentages[sliceIndex];
            const opponentPercent = 100 - yourPercent;
            const yourAmount = (billAmount * yourPercent) / 100;
            const opponentAmount = (billAmount * opponentPercent) / 100;

            resultMessage.textContent = `You ${yourPercent}% | ${opponent} ${opponentPercent}%`;
            amountDisplay.textContent = `You pay: $${yourAmount.toFixed(2)} | ${opponent} pays: $${opponentAmount.toFixed(2)}`;

            const wins = parseInt(localStorage.getItem('wins')) || 0;
            const losses = parseInt(localStorage.getItem('losses')) || 0;
            const totalGames = parseInt(localStorage.getItem('totalGames')) || 0;
            const totalPaid = parseFloat(localStorage.getItem('totalPaid')) || 0;
            localStorage.setItem('totalPaid', (totalPaid + yourAmount).toFixed(2));

            if (yourPercent <= 50) {
                localStorage.setItem('wins', wins + 1);
            } else {
                localStorage.setItem('losses', losses + 1);
            }

            localStorage.setItem('totalGames', totalGames + 1);

            const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
            const existingIndex = leaderboard.findIndex(p => p.name === opponent);

            if (existingIndex !== -1) {
                leaderboard[existingIndex].totalPaid += opponentAmount;
                leaderboard[existingIndex].wins += yourPercent > 50 ? 1 : 0;
                leaderboard[existingIndex].losses += yourPercent <= 50 ? 1 : 0;
            } else {
                leaderboard.push({
                    name: opponent,
                    totalPaid: opponentAmount,
                    wins: yourPercent > 50 ? 1 : 0,
                    losses: yourPercent <= 50 ? 1 : 0
                });
            }

            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        }

        if (isYuiDuel) {
            const playerWon = adjustedDeg >= 350 || adjustedDeg <= 10;

            resultMessage.textContent = playerWon ? '👑 YOU BEAT YUI!!' : '🦇 YUI WINS!!';
            amountDisplay.textContent = playerWon ? 'Legendary. You actually did it.' : 'Destroyed. As expected.';

            const distanceFromWin = Math.min(
                Math.abs(adjustedDeg - 355),
                360 - Math.abs(adjustedDeg - 355)
            );

            let yuiQuotes;
            if (playerWon) {
                yuiQuotes = yuiWinQuotes;
            } else if (distanceFromWin < 20) {
                yuiQuotes = [
                    "...You were so close. Isn't that the worst part?? 🦇",
                    "Aww!! A little more and you would've had me. Almost counts in horseshoes!!",
                    "That close and still nothing. I felt that one actually. Just kidding!!",
                    "So close you could taste it!! You couldn't have it though. Obviously.",
                    "...Hm. I respect the spin. Not the result. Never the result."
                ];
            } else if (distanceFromWin < 90) {
                yuiQuotes = [
                    "You weren't even in the neighborhood!! Try harder!!",
                    "Aww. You tried so hard too. Adorable.",
                    "Was that your best?? ...Okay!!",
                    "Don't be sad!! Losing builds character. Apparently.",
                    "You have such a hopeful face before every spin. It's genuinely my favorite part."
                ];
            } else {
                yuiQuotes = [
                    "Heh. That wasn't even close. Go train some more!!",
                    "5,000 years of this. You'd think they'd learn.",
                    "I didn't even flinch. The wheel barely moved toward WIN.",
                    "That was embarrassing. For you. Not me. Never me.",
                    "Come back when you're ready!! ...Actually don't. This is fine too. 🦇"
                ];
            }

            const randomYui = yuiQuotes[Math.floor(Math.random() * yuiQuotes.length)];
            const yuiDuelQuote = document.getElementById('yui-duel-quote');
            if (yuiDuelQuote) {
                yuiDuelQuote.textContent = randomYui;
                yuiDuelQuote.classList.remove('hidden');
            }

            if (playerWon) {
                localStorage.setItem('yuiBeat', 'true');
            }

            localStorage.removeItem('isYuiDuel');
        }

        resultScreen.classList.remove('hidden');

        setTimeout(() => {
            resultScreen.classList.add('show');
        }, 50);
        
        btnConfirm.classList.remove('hidden');
        btnPlayAgain.classList.remove('hidden');
        

    }, 5000);
});

btnConfirm.addEventListener('click', () => {
    if (isYuiDuel) {
        btnConfirm.disabled = true;
    } else {
    window.location.href = 'index.html';
    }
});

btnPlayAgain.addEventListener('click', () => {
    if (isYuiDuel){
    localStorage.setItem('isYuiDuel', 'true');
    window.location.reload();
    } else {
        window.location.href = 'app.html';
    }
});