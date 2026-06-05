const showBtn = document.getElementById('showBtn');
const hideBtn = document.getElementById('hideBtn');
const quote = document.getElementById('quote');

showBtn.addEventListener('click', () => { quote.style.display = 'block'; });
hideBtn.addEventListener('click', () => { quote.style.display = 'none'; });

// keyboard accessibility: toggle with Enter on focused buttons
showBtn.addEventListener('keyup', e => { if (e.key === 'Enter') quote.style.display = 'block'; });
hideBtn.addEventListener('keyup', e => { if (e.key === 'Enter') quote.style.display = 'none'; });
