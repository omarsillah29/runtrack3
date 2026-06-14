$(function () {
  const $grid = $('#grid');
  const $shuffleBtn = $('#shuffle');
  const $restartBtn = $('#restart');
  const $msg = $('#msg');

  let tiles = [];

  function createGrid() {
    $grid.empty();
    tiles = [];
    for (let i = 1; i <= 8; i++) {
      const $tile = $('<div>', { class: 'tile', 'data-pos': i }).text(i).on('click', onTileClick);
      tiles.push($tile.get(0));
      $grid.append($tile);
    }
    const $empty = $('<div>', { class: 'tile empty', 'data-pos': 'empty' });
    tiles.push($empty.get(0));
    $grid.append($empty);
  }

  function indexOfEmpty() { return tiles.findIndex(t => t.dataset.pos === 'empty'); }

  function canMove(tileIdx) {
    const emptyIdx = indexOfEmpty();
    const row = i => Math.floor(i / 3);
    const col = i => i % 3;
    const r1 = row(tileIdx), c1 = col(tileIdx);
    const r2 = row(emptyIdx), c2 = col(emptyIdx);
    const dist = Math.abs(r1 - r2) + Math.abs(c1 - c2);
    return dist === 1;
  }

  function onTileClick(e) {
    const tile = e.currentTarget;
    const idx = tiles.indexOf(tile);
    if (tile.dataset.pos === 'empty') return;
    if (canMove(idx)) {
      const emptyIdx = indexOfEmpty();
      const grid = $grid.get(0);
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
      $msg.text('Vous avez gagné').css('color', 'green');
    }
  }

  function doRandomMoves(n = 100) {
    for (let k = 0; k < n; k++) {
      const emptyIdx = indexOfEmpty();
      const neighbours = [];
      const r = i => Math.floor(i / 3);
      const c = i => i % 3;
      for (let i = 0; i < 9; i++) {
        const dist = Math.abs(r(i) - r(emptyIdx)) + Math.abs(c(i) - c(emptyIdx));
        if (dist === 1) neighbours.push(i);
      }
      const pick = neighbours[Math.floor(Math.random() * neighbours.length)];
      [tiles[pick], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[pick]];
    }
    $grid.empty();
    tiles.forEach(t => $grid.append(t));
  }

  $shuffleBtn.on('click', function () {
    $msg.text('');
    doRandomMoves(120);
  });

  $restartBtn.on('click', function () {
    $msg.text('');
    createGrid();
  });

  createGrid();
});
