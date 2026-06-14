$(function () {
	const $showBtn = $('#showBtn');
	const $hideBtn = $('#hideBtn');
	const $quote = $('#quote');

	$showBtn.on('click', function () { $quote.show(); });
	$hideBtn.on('click', function () { $quote.hide(); });

	// keyboard accessibility: toggle with Enter on focused buttons
	$showBtn.on('keyup', function (e) { if (e.key === 'Enter') $quote.show(); });
	$hideBtn.on('keyup', function (e) { if (e.key === 'Enter') $quote.hide(); });
});
