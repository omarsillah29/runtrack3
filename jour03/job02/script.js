const board = document.getElementById('board');
const shuffleBtn = document.getElementById('shuffle');
const checkBtn = document.getElementById('check');
const msg = document.getElementById('msg');

// prepare initial ordered array 1..6
const total = 6;
let items = [];

function createSlots() {
  board.innerHTML = '';
  for (let i = 1; i <= total; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.pos = i;
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', onDrop);
    board.appendChild(slot);
  }
}

function loadImages(order) {
  const slots = board.querySelectorAll('.slot');
  order.forEach((num, idx) => {
    const img = document.createElement('img');
    img.src = `images/arc${num}.png`;
    img.draggable = true;
    img.dataset.num = num;
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.dataset.num);
    });
    // graceful fallback if image missing
    img.onerror = () => { img.alt = `arc${num}.png`; img.style.width='80px'; img.style.height='auto'; };
    slots[idx].innerHTML = '';
    slots[idx].appendChild(img);
  });
}

function onDrop(e) {
  e.preventDefault();
  const fromNum = e.dataTransfer.getData('text/plain');
  if (!fromNum) return;
  const targetSlot = e.currentTarget;
  const fromSlot = [...board.children].find(s => s.querySelector(`img[data-num="${fromNum}"]`));
  if (!fromSlot) return;
  // swap nodes
  const targetImg = targetSlot.querySelector('img');
  const fromImg = fromSlot.querySelector('img');
  targetSlot.innerHTML = '';
  fromSlot.innerHTML = '';
  if (fromImg) targetSlot.appendChild(fromImg);
  if (targetImg) fromSlot.appendChild(targetImg);
}

function shuffledArray() {
  const a = Array.from({length: total}, (_,i) => i+1);
  for (let i = a.length -1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

shuffleBtn.addEventListener('click', () => {
  const order = shuffledArray();
  loadImages(order);
  msg.textContent = '';
});

checkBtn.addEventListener('click', () => {
  const nums = [...board.children].map(s => {
    const img = s.querySelector('img');
    return img ? Number(img.dataset.num) : null;
  });
  if (nums.every((n,i) => n === i+1)) {
    msg.textContent = 'Vous avez gagné';
    msg.style.color = 'green';
  } else {
    msg.textContent = 'Vous avez perdu';
    msg.style.color = 'red';
  }
});

// init
createSlots();
loadImages(Array.from({length: total}, (_,i)=>i+1));
