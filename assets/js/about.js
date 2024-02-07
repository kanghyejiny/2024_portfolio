gsap.registerPlugin(ScrollTrigger)

const scrollAnimation = () => {
  const scrollTop = $(window).scrollTop();
  const windowHeight = $(window).height();
  const scrollBottom = scrollTop + windowHeight;

  /* sec1 */
  const $sec1 = $(".sec1");
  const $sec1Inner = $sec1.find(".inner");
  const sec3Top = $(".sec3")[0] ? $(".sec3").offset().top : 0;
  const sec2MarQueeTop = $(".sec2 .marquee")[0] ? $(".sec2 .marquee").offset().top : 0;
  const opacity = (sec3Top - scrollTop - windowHeight / 10) / windowHeight;

  if (scrollTop > sec3Top) {
    if (!$sec1.hasClass("hide")) {
      $sec1.addClass("hide");
    }
  } else {
    if ($sec1.hasClass("hide")) {
      $sec1.removeClass("hide");
    }
  }

  if (scrollBottom > sec2MarQueeTop && opacity >= 0) {
    $sec1Inner.css({ opacity: opacity });
  }


  /* sec3 */
  const $sec3Imglists = $(".sec3 .img-lists");
  const $sec3ImglistsLi = $sec3Imglists.find("li");
  const sec3ImgListsLength = $sec3ImglistsLi.length;
  const sec3ImgTop = $sec3Imglists[0] ? $sec3Imglists.offset().top : 0;
  const sec3ImgBottom = sec3ImgTop + $sec3Imglists.height() + $(window).height();
  const activeDistance = (sec3ImgBottom - sec3ImgTop) / sec3ImgListsLength;

  if (scrollBottom > sec3ImgTop && scrollBottom < sec3ImgBottom) {
    const nth = Math.floor((scrollBottom - sec3ImgTop) / activeDistance);
    $sec3ImglistsLi.eq(nth).addClass("active").siblings().removeClass("active");
  }
};

const ani8 = gsap.timeline();
ani8.from(".sec3 .sec3_ani1", {x: innerWidth * 1})
    .from(".sec3 .sec3_ani2", {x: innerWidth * -1})

ScrollTrigger.create({
    animation: ani8,
    trigger: ".sec3",
    start: "top 30%",
    end: "bottom bottom",
    scrub: true,
    markers: false,
    anticipatePin: 1
});


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


// ABOUT 롤링 
const marquee = gsap.timeline();
marquee
  .addLabel('a')
  .from(".sec4 .marquee1 .wrap", { xPercent: -90 }, 'a')
  .to(".sec4 .marquee2 .wrap", { xPercent: -50 }, 'a')
  .from(".sec4 .marquee3 .wrap", { xPercent: -70 }, 'a')
ScrollTrigger.create({
  animation: marquee,
  trigger: ".sec4",
  start: "top 80%",
  end: "150% 60%",
  scrub: true,
  pin: false,
  markers: false
});


scrollAnimation();
window.addEventListener("resize", scrollAnimation);
window.addEventListener("scroll", scrollAnimation);

let cleanup = function () {
  window.removeEventListener("resize", scrollAnimation);
  window.removeEventListener("scroll", scrollAnimation);
  $(".sec1 .inner").removeAttr("style");
};