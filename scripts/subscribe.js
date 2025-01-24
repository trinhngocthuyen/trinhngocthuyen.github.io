window.addEventListener('DOMContentLoaded', () => {
  function closeSubscription() {
    $('.frontpage .subscription').css('display', 'none');
    $('.frontpage .overlay').css('display', 'none');
  }

  $('.frontpage .bell').click(function () {
    $('.frontpage .subscription').css('display', 'block');
    $('.frontpage .overlay').css('display', 'block');
  });
  $('.frontpage .subscription .close').click(closeSubscription);
  $('.frontpage .overlay').click(closeSubscription);
});