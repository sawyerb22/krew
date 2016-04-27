$(function() {
  var section = '.component';
  var selected = 'selected';

  $(document).scroll(function() {
    $('.style-nav a[href="#'+$('.component:hover').attr('id')+'"]').addClass(selected).siblings('.style-nav a').removeClass(selected);
  });

  $('.component').mouseenter(function() {
    $('.style-nav a[href="#'+$(this).attr('id')+'"]').addClass(selected).siblings('.style-nav a').removeClass(selected);
  });

  $('.style-nav a').click(function() {
    if($('.style-nav a').hasClass(selected)) {
      $('.style-nav a').removeClass(selected);
    }
    $(this).addClass(selected);
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top + 'px' }, 600, 'linear');
  });
});
