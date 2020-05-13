document.addEventListener('DOMContentLoaded', () => {
    let selector = selector => document.querySelector(selector);
    let selectorAll = selector => document.querySelectorAll(selector);
    const headerSubnav = selectorAll(".header__subnav")
    const headerBottomItem = selectorAll(".header__bottom-item")
    const headerNav = selectorAll(".header__nav")
    const headerIten = selectorAll('.header__item')

    navItemActive = null;
    headerIten.forEach(function(e){
        e.addEventListener('click', function(){
            e.querySelector('.header__subnav').classList.toggle('header__subnav_no-visible');
             if(navItemActive !==null && navItemActive !== e.querySelector('.header__subnav') ) {
                navItemActive.classList.add('header__subnav_no-visible')
            }   
            navItemActive = event.target.closest(".header__item").querySelector('.header__subnav');
            console.log(navItemActive)
        })
    })

    //header slider

    var headerSlider = new Swiper('.header__slide_container', {
        speed: 400,
        spaceBetween: 100,
        pagination: {
            el: '.header__dots-list',
            clickable: true,
        },
    });
});