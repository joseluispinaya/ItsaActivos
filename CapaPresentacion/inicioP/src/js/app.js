jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
        this.addEventListener("touchstart", handle, { passive: true });
    }
};

(() => {
    $(document).ready(function () {
    "use strict";

    initHeroSlider();
    initTestimonialsSlider();

    var header = $('.header');

    setHeader();

    $(window).on('resize', function () {
        setHeader();
    });

    $(document).on('scroll', function () {
        setHeader();
    });

    /* 1. Set Header */
    function setHeader() {
        if (window.innerWidth < 992) {
            if ($(window).scrollTop() > 100) {
                header.addClass('scrolled');
            }
            else {
                header.removeClass('scrolled');
            }
        }
        else {
            if ($(window).scrollTop() > 100) {
                header.addClass('scrolled');
            }
            else {
                header.removeClass('scrolled');
            }
        }
    }
    /* 2. Inicio Hero Slider*/
    function initHeroSlider() {
        if ($('.hero_slider').length) {
            var owl = $('.hero_slider');

            owl.owlCarousel(
                {
                    items: 1,
                    loop: true,
                    smartSpeed: 800,
                    autoplay: true,
                    nav: false,
                    dots: false
                });

            // agrega animate.css class(es) a los elementos a animar
            function setAnimation(_elem, _InOut) {
                // Almacena todos los nombres de eventos de fin de animación en un string.
                // revisar animate.css documentacion
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                _elem.each(function () {
                    var $elem = $(this);
                    var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

                    $elem.addClass($animationType).one(animationEndEvent, function () {
                        $elem.removeClass($animationType); // remove animate.css clases al final de las animaciones
                    });
                });
            }

            // activa antes del cambio de diapositiva actual
            owl.on('change.owl.carousel', function (event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-out]");
                setAnimation($elemsToanim, 'out');
            });

            // Se activa despues de que se haya cambiado la diapositiva actual
            owl.on('changed.owl.carousel', function (event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation($elemsToanim, 'in');
            })

            // Manejar navegacion personalizada
            if ($('.cliLeft').length) {
                var owlPrev = $('.cliLeft');
                owlPrev.on('click', function () {
                    owl.trigger('prev.owl.carousel');
                });
            }

            if ($('.cliRight').length) {
                var owlNext = $('.cliRight');
                owlNext.on('click', function () {
                    owl.trigger('next.owl.carousel');
                });
            }
        }
    }
});
/* 6. Inicializa Slider de carreras*/

function initTestimonialsSlider() {
    if ($('.carreras').length) {
        var owl1 = $('.carreras');

        owl1.owlCarousel(
            {
                items: 2,
                margin: 30,
                loop: true,
                dots: true,
                autoplayHoverPause: false,
                autoplayTimeout: 5000, // delay
                smartSpeed: 750,
                slideBy: 2, // recorre item
                autoplay: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    480: {
                        items: 2,
                        autoplayTimeout: 6000,
                    },
                    992: {
                        items: 4,
                        autoplayTimeout: 7000,
                        smartSpeed: 850,
                    }
                }
            });
        // Pausar
        owl1.on('mouseenter', function () {
            owl1.trigger('stop.owl.autoplay');
        });

        // Reanudar
        owl1.on('mouseleave', function () {
            owl1.trigger('play.owl.autoplay');
        });
    }
}
/* JS Pagina principal */
window.addEventListener('DOMContentLoaded',  () => {
    const estudent = document.querySelector('#contEstudent');
    const materia = document.querySelector('#contMateria');
    const horas = document.querySelector('#contHoras');
    const graduados = document.querySelector('#contGraduados');

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    const interval = setInterval(() => {
        if (count1 <= 1000) {
            estudent.textContent = count1;
            count1++;
        }
        if (count2 <= 300) {
            horas.textContent = count2;
            count2++;
        }
        if (count3 <= 200) {
            materia.textContent = count3;
            count3++;
        }
        if (count4 <= 500) {
            graduados.textContent = count4;
            count4++;
        }
        if (count1 > 1000 && count2 > 300 && count3 > 200 && count4 > 500) {
            clearInterval(interval);
        }
    }, 80);
});

window.addEventListener('resize', retirarMenu);
function retirarMenu() {
    const ancho = window.innerWidth;
    if (ancho >= 768 && submenuAbierto) {
        submenuAbierto.classList.remove('max-h-[300px]');
        submenuAbierto.classList.add('max-h-0');
    }
    if (ancho >= 768) {
        amburActive.checked = false;
        menuActivar()
    }
}
/* submenu */
const menuPadre = document.querySelector('#menu-padre');
let submenuAbierto = null;

function abrirSubMenu(e) {
    const lista = e.target;
    const submenu = lista.nextElementSibling;

    if (submenu && submenu.classList.contains('submenu') && window.innerWidth < 768) {
        if (submenuAbierto && submenuAbierto !== submenu) {
            submenuAbierto.classList.remove('max-h-[300px]');
            submenuAbierto.classList.add('max-h-0');
        }
        submenu.classList.toggle('max-h-[300px]');
        submenu.classList.toggle('max-h-0');
        submenuAbierto = submenu;
    }
}

menuPadre.addEventListener('click', abrirSubMenu);
/* codigo para activar animacion de submenu movil */
const amburActive = document.querySelector('#amburActive');
const efectoMenu = document.querySelector('.efectoMenu');


amburActive.addEventListener('click', menuActivar);
let activo = false;
const redes = document.querySelector('.redesMenu');

function menuActivar() {
    const ambur = document.querySelector('[for="amburActive"]');
    amburguesa(ambur);
    activer();

}
function amburguesa(label) {
    if (amburActive.checked) {
        label.children[0].classList.add('rotate-45', 'translate-y-1');
        label.children[1].classList.add('hidden');
        label.children[2].classList.add('-rotate-45', '-translate-y-1');
    } else {
        label.children[0].classList.remove('rotate-45', 'translate-y-1');
        label.children[1].classList.remove('hidden');
        label.children[2].classList.remove('-rotate-45', '-translate-y-1');
    }
}

function activer() {
    setTimeout(() => {

        if (amburActive.checked) {
            efectoMenu.classList.remove('efectoMenu');
            activo = true;
            redesActivar();
        } else {
            efectoMenu.classList.add('efectoMenu');
            if (window.innerWidth >= 768) {
                efectoMenu.classList.remove('efectoMenu');
            }
            activo = false;
            redesActivar();
        }
    }, 500);
}
function redesActivar() {

    if (activo) {
        redes.classList.remove('redesMenu');
        setTimeout(() => {
            redes.classList.add('translate-y-5');
        }, 700);
    } else {
        redes.classList.add('redesMenu');
        setTimeout(() => {
            redes.classList.remove('translate-y-5');
        }, 1000);
    }
}
})();