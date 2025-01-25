window.addEventListener('DOMContentLoaded', () => {
  function closeSubscription() {
    $('.frontpage .subscription').css('transform', 'translate(-50%, -50%) scale(0)');
    $('.frontpage .overlay').css('display', 'none');
  }

  $('.frontpage .bell').click(function () {
    $('.frontpage .subscription').css('transform', 'translate(-50%, -50%) scale(1)');
    $('.frontpage .overlay').css('display', 'block');
  });
  $('.frontpage .subscription .close').click(closeSubscription);
  $('.frontpage .overlay').click(closeSubscription);
});