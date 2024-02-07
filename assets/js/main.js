gsap.registerPlugin(ScrollTrigger)

/* lenis 부드럽게 움직임을 주는 스무스 효과 */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

$('.menu__btn').click(function () {
  $('header').toggleClass('active');
});

/* a,button, .cursor__btn mouse hover 효과 */
$('a, button, .cursor__btn').mouseenter(function () {
  $('.cursor').addClass("hover");
});
$('a, button, .cursor__btn').mouseleave(function () {
  $('.cursor').removeClass("hover");
});

/* main circle bg */
$('.circle').mouseenter(function (e) {
  const i = $(e.target).parents(".circle").index() + 1;
  $(".circle" + i).addClass("on");
});

$('.circle').mouseleave(function (e) {
  $('.main .bg').removeClass("on");
});

/* background change */
gsap.utils.toArray(".sec").forEach((item) => {
  let color = item.getAttribute("data-bgcolor");
  ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 10%",
      onEnter: () => gsap.to("body", {
          backgroundColor: color,
          duration: 1.4
      }),
      onEnterBack: () => gsap.to("body", {
          backgroundColor: color,
          duration: 1.4
      }),
  });
});

/* 모바일 100vh 스크롤 문제 해결 */
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();

/* 스크린 사이즈가 변경될 때마다 --vh 크기 변경 해주기 */
window.addEventListener('resize', () => setScreenSize());

/* 마우스 cursor */
const cursor = document.querySelector('.cursor');

/* cursor 이동 */
document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`
  cursor.style.left = `${e.clientX}px`
  cursor.animate({
    top: `${e.clientY}px`, left: `${e.clientX}px`
  }, 1000)
});

/* 링크 hover */
let links = document.querySelectorAll('a');
links.forEach(i => {
  i.addEventListener('mouseover', () => {
    cursor.classList.add('pointer');
  });
  i.addEventListener('mouseout', () => {
    cursor.classList.remove('pointer');
  });
})

/* 버튼 hover */
let btns = document.querySelectorAll('button');
btns.forEach(i => {
  i.addEventListener('mouseover', () => {
    cursor.classList.add('pointer');
  });
  i.addEventListener('mouseout', () => {
    cursor.classList.remove('pointer');
  });
})

const swiper = new Swiper('.content .swiper', {
  slidesPerView: 'auto',
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
  },
  speed: 18000,
});