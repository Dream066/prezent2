let swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});


let swiper2 = new Swiper('.swiper-container2', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
        // when window width is >= 320px
        280: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        700: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        // when window width is >= 480px
        1200: {
            slidesPerView: 3,
        },
        2200: {
            slidesPerView: 4,
        },
        // when window width is >= 640px
    }
});