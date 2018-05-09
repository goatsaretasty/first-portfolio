/* Element Onscreen Visibility Checker. Used in combination with .parallax class in CSS.
   The following visible-viewport checker from https://github.com/customd/jquery-visible
   - Used for the parallax effect on markup. */
//

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user-visible viewport of a web browser.
     *     Only accounts for vertical position, not horizontal.
     */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);
//
/* End Element Onscreen Visibility checker */
//
/* Navigation Menu, Sticky Nav, adapted from Wes Bos's JavaScript 30 course. The first portion
   brings elements into view based on scroll position, and the last portion creates an effect
   on the navigation bar based on scroll position. */
//
let win = $(window);
let allMods = $(".box-content");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function(event) {
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });
});

const nav = document.getElementById('navigation');
let topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
window.addEventListener('scroll', fixNav);
