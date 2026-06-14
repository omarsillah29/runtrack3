$(function () {
  const total = 6;
  const $board = $('#board');
  const $shuffleBtn = $('#shuffle');
  const $checkBtn = $('#check');
  const $msg = $('#msg');

  function createSlots() {
    $board.empty();

    for (let i = 1; i <= total; i++) {
      $('<div>', {
        class: 'slot',
        'data-pos': i,
      })
        .on('dragover', function (event) {
          event.preventDefault();
        })
        .on('drop', onDrop)
        .appendTo($board);
    }
  }

  function loadImages(order) {
    const $slots = $board.find('.slot');

    order.forEach(function (num, idx) {
      const $img = $('<img>', {
        src: 'images/arc' + num + '.png',
        draggable: true,
        'data-num': num,
        alt: 'arc' + num + '.png',
      })
        .on('dragstart', function (event) {
          event.originalEvent.dataTransfer.setData('text/plain', $(this).data('num')); 
        })
        .on('error', function () {
          $(this).css({ width: '80px', height: 'auto' });
        });

      $slots.eq(idx).empty().append($img);
    });
  }

  function onDrop(event) {
    event.preventDefault();

    const fromNum = event.originalEvent.dataTransfer.getData('text/plain');
    if (!fromNum) {
      return;
    }

    const $targetSlot = $(this);
    const $fromSlot = $board.children().filter(function () {
      return $(this).find('img[data-num="' + fromNum + '"]').length > 0;
    });

    if (!$fromSlot.length) {
      return;
    }

    const $targetImg = $targetSlot.find('img').detach();
    const $fromImg = $fromSlot.find('img').detach();

    $targetSlot.empty().append($fromImg);
    $fromSlot.empty().append($targetImg);
  }

  function shuffledArray() {
    const array = Array.from({ length: total }, function (_, index) {
      return index + 1;
    });

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  $shuffleBtn.on('click', function () {
    loadImages(shuffledArray());
    $msg.text('').css('color', '');
  });

  $checkBtn.on('click', function () {
    const nums = $board.children().map(function () {
      const $img = $(this).find('img');
      return $img.length ? Number($img.data('num')) : null;
    }).get();

    if (nums.every(function (num, index) {
      return num === index + 1;
    })) {
      $msg.text('Vous avez gagné').css('color', 'green');
    } else {
      $msg.text('Vous avez perdu').css('color', 'red');
    }
  });

  createSlots();
  loadImages(Array.from({ length: total }, function (_, index) {
    return index + 1;
  }));
});
