import $ from 'jquery';

$.fn.rwdTable = function(userOptions) {

	var $this = this;

	let opt = {};
	let elementsObj = {};

	const defaultOptions = {
	};

	opt = $.extend({}, defaultOptions, userOptions);

	$this.each(function(index, table) {
		$(table).find('tbody tr').each(function(index, tr) {
			$(tr).find('td').each(function(index, td) {
				let value = $(table).find('thead tr th:eq('+index+')').text();
				$(this).attr('data-title', value);
			});
		});
	});

	function useRWD() {
		$this.each(function() {
			if($(this).data('width')===undefined) {
				let tableWidth = $(this).outerWidth();
				let parentWidth = $(this).parent().width();
				if(tableWidth > parentWidth) {
					$(this).attr('data-width',parentWidth);
					toggleRwdClass(this);
				}
			} else {
				toggleRwdClass(this);
			}
		});
	}

	function toggleRwdClass(table) {
		let tableMaxWidth = $(table).data('width');
		let parentWidth = $(table).parent().width();
		$(table).toggleClass('use-rwd', tableMaxWidth >= parentWidth);
		let tableWidth = $(table).outerWidth();
		if(tableWidth > parentWidth) {
			$(table).attr('data-width',parentWidth);
			tableMaxWidth = parentWidth;
		}
		$(table).toggleClass('use-rwd', tableMaxWidth >= parentWidth);
	}

	useRWD();

	$(window).resize(function() {
		useRWD();
	});

	return $this;

};