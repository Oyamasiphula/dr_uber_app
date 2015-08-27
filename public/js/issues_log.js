/*
  Custom checkbox and radio button - Jun 18, 2013
  (c) 2013 @ElmahdiMahmoud 
  license: http://www.opensource.org/licenses/mit-license.php
*/   

$('input[name="issues"]').wrap('<div class="check-box"><i></i></div>');
$.fn.toggleCheckbox = function () {
    this.attr('checked', !this.attr('checked'));
}
$('.check-box').on('click', function () {
    $(this).find(':checkbox').toggleCheckbox();
    $(this).toggleClass('checkedBox');
});