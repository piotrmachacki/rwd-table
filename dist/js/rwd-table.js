/*!
 * RWD Table (v1.0.0)
 * @copyright 2018 Piotr Machacki <piotr@machacki.pl>
 * @licence Apache License, Version 2.0
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	$.fn.rwdTable = function (userOptions) {

		var $this = this;

		var opt = {};

		var defaultOptions = {};

		opt = $.extend({}, defaultOptions, userOptions);

		$this.each(function (index, table) {
			$(table).find('tbody tr').each(function (index, tr) {
				$(tr).find('td').each(function (index, td) {
					var value = $(table).find('thead tr th:eq(' + index + ')').text();
					$(this).attr('data-title', value);
				});
			});
		});

		function useRWD() {
			$this.each(function () {
				if ($(this).data('width') === undefined) {
					var tableWidth = $(this).outerWidth();
					var parentWidth = $(this).parent().width();
					if (tableWidth > parentWidth) {
						$(this).attr('data-width', parentWidth);
						toggleRwdClass(this);
					}
				} else {
					toggleRwdClass(this);
				}
			});
		}

		function toggleRwdClass(table) {
			var tableMaxWidth = $(table).data('width');
			var parentWidth = $(table).parent().width();
			$(table).toggleClass('use-rwd', tableMaxWidth >= parentWidth);
			var tableWidth = $(table).outerWidth();
			if (tableWidth > parentWidth) {
				$(table).attr('data-width', parentWidth);
				tableMaxWidth = parentWidth;
			}
			$(table).toggleClass('use-rwd', tableMaxWidth >= parentWidth);
		}

		useRWD();

		$(window).resize(function () {
			useRWD();
		});

		return $this;
	};

})));
//# sourceMappingURL=rwd-table.js.map
