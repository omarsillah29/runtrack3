const grid = document.getElementById('grid');
const shuffleBtn = document.getElementById('shuffle');
const restartBtn = document.getElementById('restart');
const msg = document.getElementById('msg');

let tiles = [];

function createGrid() {
  grid.innerHTML = '';
  tiles = [];
  for (let i = 1; i <= 8; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = i;
    tile.dataset.pos = i;
    tile.addEventListener('click', onTileClick);
    tiles.push(tile);
  }
  // add empty
  const empty = document.createElement('div');
  empty.className = 'tile empty';
  empty.dataset.pos = 'empty';
  tiles.push(empty);
  tiles.forEach(t => grid.appendChild(t));
}

function indexOfEmpty() { return tiles.findIndex(t => t.dataset.pos === 'empty'); }

function canMove(tileIdx) {
  const emptyIdx = indexOfEmpty();
  const row = i => Math.floor(i/3);
  const col = i => i%3;
  const r1 = row(tileIdx), c1 = col(tileIdx);
  const r2 = row(emptyIdx), c2 = col(emptyIdx);
  const dist = Math.abs(r1-r2) + Math.abs(c1-c2);
  return dist === 1;
}

function onTileClick(e) {
  const tile = e.currentTarget;
  const idx = tiles.indexOf(tile);
  if (tile.dataset.pos === 'empty') return;
  if (canMove(idx)) {
    const emptyIdx = indexOfEmpty();
    // swap in DOM and array
    grid.insertBefore(tiles[emptyIdx], tiles[idx]);
    grid.insertBefore(tiles[idx], grid.children[emptyIdx]);
    [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
    checkWin();
  }
}

function checkWin() {
  const seq = tiles.map(t => t.dataset.pos === 'empty' ? 'empty' : Number(t.dataset.pos));
  const correct = [1,2,3,4,5,6,7,8,'empty'];
  const ok = seq.every((v,i) => v === correct[i]);
  if (ok) {
    msg.textContent = 'Vous avez gagné';
    msg.style.color = 'green';
  }
}

function doRandomMoves(n=100) {
  for (let k=0;k<n;k++) {
    const emptyIdx = indexOfEmpty();
    const neighbours = [];
    const r = i => Math.floor(i/3);
    const c = i => i%3;
    for (let i=0;i<9;i++) {
      const dist = Math.abs(r(i)-r(emptyIdx)) + Math.abs(c(i)-c(emptyIdx));
      if (dist===1) neighbours.push(i);
    }
    const pick = neighbours[Math.floor(Math.random()*neighbours.length)];
    // swap
    [tiles[pick], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[pick]];
  }
  // re-render grid
  grid.innerHTML = '';
  tiles.forEach(t => grid.appendChild(t));
}

shuffleBtn.addEventListener('click', () => {
  msg.textContent = '';
  doRandomMoves(120);
});

restartBtn.addEventListener('click', () => {
  msg.textContent = '';
  createGrid();
});

createGrid();
