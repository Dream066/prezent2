document.addEventListener('DOMContentLoaded', function () {
    function isTablet() {
        return window.matchMedia('(max-width: 1000px)').matches
    }

    let isInited = window.matchMedia('(max-width: 1000px)').matches
    const sections = [...document.querySelectorAll('.js-section')]

    function onScroll() {
        const isPageEnd = window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight;

        sections.forEach((section) => {
            const { top, bottom } = section.getBoundingClientRect()
            const inViewport = top <= 0 && bottom >= 0
            const id = section.getAttribute('id')

            if (inViewport && !isPageEnd) {
                document.querySelector(`[data-menuanchor="${id}"]`).classList.add('active')
            } else {
                document.querySelector(`[data-menuanchor="${id}"]`).classList.remove('active')
            }
        })

        if (isPageEnd) {
            const id = sections[sections.length - 1].getAttribute('id')
            document.querySelector(`[data-menuanchor="${id}"]`).classList.add('active')
        }
    }

    function moveToContacts() {
        const linkToContacts = document.getElementById('linkToContacts')

        linkToContacts.addEventListener('click', (event) => {
            const searchSection = document.getElementById('contacts')

            event.preventDefault()
            const { top, bottom } = searchSection.getBoundingClientRect()


            window.scrollTo({
                top: window.scrollY + top,
                behavior: "smooth"
            });
        })
    }

    function scrollToSection() {
        const items = document.querySelectorAll('.header__menu-item');

        [...items].forEach(item => {
            const section = document.getElementById(item.dataset.menuanchor);

            item.addEventListener('click', function (event) {
                event.preventDefault();

                const { top } = section.getBoundingClientRect()

                window.scrollTo({
                    top: window.scrollY + top,
                    behavior: "smooth"
                });

                if (isTablet()) {
                    document.querySelector('.header__menu').classList.remove('active');
                }
            })
        })
    }

    function initPaging() {

        if (isTablet() && isInited) {
            isInited = false

            if ($.fn.pagepiling.destroy) {
                $.fn.pagepiling.destroy('all');
            }

            document.querySelector('body').style.overflow = 'auto';
            document.querySelector('html').style.overflow = 'auto';
            [...document.querySelectorAll('.header__menu-item')].forEach(element => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                }
                if (document.getElementById('pagepiling')) {
                    scrollToSection();
                    moveToContacts()
                }
            });
            if (document.getElementById('pagepiling')) {
                window.addEventListener('scroll', onScroll)
            }
        } else if (!isTablet() && !isInited && document.getElementById('pagepiling')) {
            isInited = true

            if (document.getElementById('pagepiling')) {
                window.removeEventListener('scroll', onScroll)
            }

            const anchors = ['home', 'cases', 'about', 'services', 'partners', 'awards', 'testimonials', 'blog', 'contacts']
            const labels = ['home', 'Selected works', 'about me', 'services', 'My clients', 'awards', 'testimonials', 'My insights', 'get in touch']

            function setLabel(index) {
                const label = labels[index];

                [...document.querySelectorAll('.js-page-label')].forEach(element => {
                    element.textContent = label
                });
            }

            function setPageNumber(index) {
                [...document.querySelectorAll('.js-page-number')].forEach(element => {
                    element.textContent = `${index + 1}/${labels.length}`
                });
            }

            function setActiveMenu(index) {
                const anchor = anchors[index];
                const header = document.querySelector('.header__menu')

                header.classList.remove('active')
                document.querySelector(`[data-menuanchor="${anchor}"]`).classList.add('active')
            }

            function progressBar(index) {
                const progressBar = document.querySelector('.gold-line-js');

                progressBar.style.height = 100 / 9 * index + '%';
            }

            function animationActiveSection(index, nextIndex) {
                const anchor = anchors[index];
                const nextAnchor = anchors[nextIndex];
                const nextActiveSection = document.querySelector(`.section-${nextAnchor}`);
                const activeSection = document.querySelector(`.section-${anchor}`);

                if (nextActiveSection.classList.contains('active')) {
                    nextActiveSection.querySelector('.section-main').style.opacity = "1";
                    activeSection.querySelector('.section-main').style.opacity = "0";
                }
            }

            let timeout = null;

            $('#pagepiling').pagepiling({
                anchors: anchors,
                verticalCentered: false,
                scrollingSpeed: 150,
                easing: 'swing',
                menu: '#myMenu',

                onLeave: function (index, nextIndex, direction) {
                    setPageNumber(nextIndex - 1)
                    setLabel(nextIndex - 1)
                    progressBar(nextIndex)
                    clearTimeout(timeout);
                    timeout = setTimeout(animationActiveSection, 700, index - 1, nextIndex - 1)
                },

                afterRender: function () {
                    setPageNumber(0)
                    setLabel(0)
                    setActiveMenu(0)
                    progressBar(1)
                    clearTimeout(timeout);
                    timeout = setTimeout(animationActiveSection, 700, 1, 0)
                }
            });
        }
    }

    initPaging();

    window.addEventListener('resize', initPaging);

    function disabledPreloader() {
        document.getElementById('preloader').style.display = 'none';
    }

    function addNoise(element) {
        let canvas, ctx;
        let wWidth, wHeight;
        let noiseData = [];
        let frame = 0;
        let loopTimeout;


        const createNoise = () => {
            const idata = ctx.createImageData(wWidth, wHeight);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) {
                    buffer32[i] = 0xff000000;
                }
            }
            noiseData.push(idata);
        };

        const paintNoise = () => {
            if (frame === 9) {
                frame = 0;
            } else {
                frame++;
            }
            ctx.putImageData(noiseData[frame], 0, 0);
        };

        const loop = () => {
            paintNoise(frame);

            loopTimeout = window.setTimeout(() => {
                window.requestAnimationFrame(loop);
            }, (1000 / 25));
        };

        const setup = () => {
            wWidth = window.innerWidth;
            wHeight = window.innerHeight;
            canvas.width = wWidth;
            canvas.height = wHeight;
            for (let i = 0; i < 10; i++) {
                createNoise();
            }
            loop();
        };

        canvas = element.querySelector('.noise');
        ctx = canvas.getContext('2d');
        setup();
    }

    ;[...document.querySelectorAll('.section')].forEach(addNoise)

    setTimeout(disabledPreloader, 1200);

    $("a.fancybox").fancybox({
        type: 'iframe',
        allowfullscreen: 'true'
    });
});
