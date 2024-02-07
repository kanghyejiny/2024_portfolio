gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray(".reveal").forEach((item) => {
  ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
      onEnter: () => {animate(item)}, 
  });
  item.style.opacity = "0";
});

const animate = (item) => {
  gsap.fromTo(item, 
      {autoAlpha: 0, x: 0, y: -50}, 
      {autoAlpha: 1, x: 0, y: 0, duration: 1.25, overwrite: "auto", ease: "expo"}
  );
}


// 프로젝트 호버시 마우스 이미지 변경
let cursorImgBox = document.querySelector('.cursor .img__box');
let workLinks = document.querySelectorAll('.project__list__item a:first-child');

// 커서 이동시 이미지박스 함께 이동
document.addEventListener('mousemove', (e) => {
  cursorImgBox.style.top = `${e.clientY}px`
  cursorImgBox.style.left = `${e.clientX}px`
  cursorImgBox.animate({
    top: `${e.clientY}px`, left: `${e.clientX}px`
  }, 2000)
});

workLinks.forEach(i => {
  imageUrl = $(i).attr('data-img');
  let cursorImg = document.querySelector(`${imageUrl}`);

  i.addEventListener('mouseover', () => {
    cursorImgBox.classList.add('on');
    cursorImg.classList.add('on');
  });
  i.addEventListener('mouseout', () => {
    cursorImgBox.classList.remove('on');
    cursorImg.classList.remove('on');
  });
})