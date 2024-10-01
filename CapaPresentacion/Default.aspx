<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Favicon no esta-->
    <link rel="shortcut icon" href="inicioP/src/image/inicio/loico.ico" type="image/x-icon">
    <!-- Author Meta -->
    <meta name="author" content="ITSA">
    <!-- Meta Description -->
    <meta name="description" content="Instituto Tecnologico Superior la Amazonia">
    <!-- Meta Keyword -->
    <meta name="keywords" content="">
    <title>ITSA</title>
    <!-- iconos -->
    <link href="inicioP/plugins/fontawesome-free-5.0.1/css/fontawesome-all.css" rel="stylesheet" type="text/css">
    <!-- Owl.carousel -->
    <link rel="stylesheet" href="inicioP/plugins/owlcarousel/owl.carousel.css">
    <link rel="stylesheet" href="inicioP/plugins/owlcarousel/owl.theme.default.css">
    <!-- Animate.css -->
    <link rel="stylesheet" type="text/css" href="inicioP/plugins/owlcarousel/animate.css">
    <!-- Fuentes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bona+Nova:ital,wght@0,400;0,700;1,400&family=Raleway:wght@500;600;700&display=swap"
        rel="stylesheet">
    <link rel="preload" href="inicioP/dist/img/inicio/banner-bg.jpg" as="image">
    <link rel="preload" href="inicioP/dist/img/inicio/slide1.jpg" as="image">
    <link rel="preload" href="inicioP/dist/img/inicio/slide2.jpg" as="image">
    <link rel="stylesheet" href="inicioP/dist/css/output.css">
</head>

<body>

    <div class="w-full overflow-hidden relative text-[#a5a5a5]">

        <!-- Menu-hero -->
        <header
            class="header transition-all shadow-xl shadow-[rgba(0,0,0,0.67)] max-w-[1200px] w-[90%] fixed z-40 left-1/2 -translate-x-1/2 top-8 md:top-11">
            <div class="px-6 md:px-2 lg:px-6 py-3 bg-primario flex items-center justify-between lg:pr-0 ">
                <!-- Logo -->
                <div>
                    <a href="#" class="logo">
                        <img src="inicioP/dist/img/inicio/logo.png" lazyalt="imagen" style="max-width: 30%; height: auto;">
                        <!-- <picture>
                            <source srcset="dist/img/inicio/logo.avif, 
                                     dist/img/inicio/logo.webp, 
                                     dist/img/inicio/logo.png" type="image/png">
                            <img decoding="async" src="dist/img/inicio/logo.png" lazyalt="imagen" width="159"
                                height="40" alt="Logo Itsa" class="object-cover">
                        </picture> -->
                    </a>
                </div>
                <!-- Menu Amburguesa -->
                <input type="checkbox" id="amburActive" class="peer hidden">
                <label for="amburActive"
                    class="w-6 h-6 cursor-pointer flex flex-col justify-evenly items-center rounded-sm md:hidden">
                    <div class="transition-all bg-white w-6 h-[3px]"></div>
                    <div class="transition-all bg-white w-6 h-[3px]"></div>
                    <div class="transition-all bg-white w-6 h-[3px]"></div>
                </label>

                <!-- Nav-Navegacion -->
                <nav
                    class="w-full transition-all duration-700 -translate-x-full left-0 top-16 z-10 h-screen landscape:min-h-max landscape:overflow-y-auto md:landscape:overflow-visible absolute md:static md:translate-x-0 md:h-full bg-[url('../inicioP/img/inicio/movil_menu.svg')] bg-cover bg-gris bg-right-top peer-checked:translate-x-0 opacity-0 md:opacity-100 peer-checked:opacity-100">
                    <div class="mx-auto my-7 landscape:mt-0 md:bg-primario w-2/3 h-full md:w-full md:flex md:m-0">

                        <ul class="efectoMenu md:translate-y-0 md:opacity-100 md:visible transition duration-1000 space-y-1 md:space-y-0 text-primario md:text-white font-bold pt-5 md:p-0 md:flex md:items-center md:w-full md:justify-around"
                            id="menu-padre">
                            <li
                                class=" hover:text-secundario hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Inicio</a>
                            </li>
                            <li
                                class="hover:text-secundario hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Acerca de</a>
                            </li>
                            <li
                                class="hover:text-secundario group md:py-5 hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Carrera<i class="ml-2 lg:ml-4 fas fa-angle-down"></i></a>
                                <ul class="max-h-0 overflow-hidden md:absolute submenu md:group-hover:max-h-[350px] space-y-1 md:bg-gris md:mt-[34px] capitalize text-black font-semibold md:px-5 ml-3 pl-3 md:-ml-8 text-sm border-l-2 border-secundario
                                md:border-none md:shadow-[0px_20px_49px_#1d2031_inset]
                                md:rounded-b-lg">
                                    <li class="hover:text-secundario pt-2"><a href="#">Contaduria
                                            Pública</a></li>
                                    <li class="hover:text-secundario"><a href="#">Administración
                                            de
                                            Empresa</a></li>
                                    <li class="hover:text-secundario"><a href="#">Secretariado
                                            Ejecutivo</a></li>
                                    <li class="hover:text-secundario"><a href="#">Sistemas
                                            Informáticos</a>
                                    </li>
                                    <li class="hover:text-secundario"><a href="#">Agropecuaria</a>
                                    </li>
                                    <li class="hover:text-secundario"><a href="#">Turismo</a></li>
                                    <li class="hover:text-secundario"><a href="#">Industria de
                                            Alimentos</a></li>
                                    <li class="hover:text-secundario"><a href="#">Veterinaria y
                                            Zootecnia</a></li>
                                    <li class="hover:text-secundario"><a href="#">Mecánica
                                            Automotriz</a>
                                    </li>
                                    <li class="hover:text-secundario pb-4"><a
                                            href="#">Piscicultura</a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                class="hover:text-secundario hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Admisiones</a>
                            </li>
                            <li
                                class="hover:text-secundario group md:py-5 hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Intranet<i class="ml-2 lg:ml-4 fas fa-angle-down"></i></a>
                                <ul class="max-h-0 overflow-hidden md:absolute submenu md:group-hover:max-h-[350px] space-y-1 md:bg-gris md:mt-[34px] capitalize text-black font-semibold md:px-5 ml-3 md:-ml-8 pl-3 text-sm border-l-2 border-secundario
                                md:border-none md:shadow-[0px_20px_49px_#1d2031_inset]
                                md:rounded-b-lg">
                                    <li class="hover:text-secundario pt-2"><a
                                            href="https://itsariberalta.edu.bo/academico/login.aspx"
                                            target="_blank">Sistema de
                                            Notas</a></li>
                                    <li class="hover:text-secundario">
                                        <a href="IniciarSesion.aspx">Administracion</a></li>
                                    <li class="hover:text-secundario">
                                        <a href="IniciarSesion.aspx">Gestion de Proyectos</a></li>
                                    <li class="hover:text-secundario"><a href="#"
                                            target="_blank">Multimedia</a></li>
                                    <li class="hover:text-secundario pb-4"><a
                                            href="#"
                                            target="_blank">Evaluación de Desempeño</a></li>
                                </ul>
                            </li>
                            <li
                                class="hover:text-secundario group md:py-5 hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="#">Cursos<i class="ml-2 lg:ml-4 fas fa-angle-down"></i></a>
                                <ul class="max-h-0 overflow-hidden md:absolute submenu md:group-hover:max-h-[350px] space-y-1 md:bg-gris md:mt-[34px] capitalize text-black font-semibold md:px-5 ml-3 md:-ml-16 pl-3 text-sm border-l-2 border-secundario
                                md:border-none md:shadow-[0px_20px_49px_#1d2031_inset]
                                md:rounded-b-lg">
                                    <li class="hover:text-secundario text-nowrap pt-2"><a
                                            href="#">Detalle de los Cursos
                                            Cortos</a></li>
                                    <li class="hover:text-secundario"><a href="#">Detalle de
                                            Eventos</a>
                                    </li>
                                    <li class="hover:text-secundario"><a href="#">Requisitos</a>
                                    </li>
                                    <li class="hover:text-secundario pb-4"><a href="#">Niveles</a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                class="hover:text-secundario hover:after:w-full md:after:block after:h-0.5 hover:after:bg-secundario after:transition after:duration-1000">
                                <a href="http://www.itsariberalta.edu.bo/turismo/index.html"
                                    target="_blank">Inf.Turismo</a>
                            </li>
                        </ul>
                        <!-- Virrete-header -->
                        <div
                            class="hidden w-32 mr-6 bg-secundario lg:flex lg:justify-center lg:items-center rounded-md  shadow-[0_0_10px_#ffff_inset]">
                            <div class="animate-bounce w-12 shadow-[0_0_7px_#ffff_inset,_0_4px_5px_#ffff] rounded-lg">
                                <img src="https://www.itsariberalta.edu.bo/src/image/inicio/virrete-pergamin.svg" class="w-full block" alt="birrete">
                            </div>
                        </div>

                        <!-- Redes sociales -->
                        <ul
                            class="redesMenu transition duration-1000 flex w-full max-w-80 justify-between text-white h-9 md:hidden">
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-[50%] bg-secundario grid place-items-center">
                                <a href="https://api.whatsapp.com/send?phone=59169391180" target="_blank"><i
                                        class="fab fa-whatsapp"></i></a>
                            </li>
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-[50%] bg-secundario grid place-items-center">
                                <a href="https://www.facebook.com/itsariberalta/" target="_blank"><i
                                        class="fab fa-facebook-f"></i></a>
                            </li>
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-[50%] bg-secundario grid place-items-center">
                                <a href="https://www.youtube.com/@itsariberalta8717" target="_blank"><i
                                        class="fab fa-youtube"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav><!-- Nav-navegacion -->
            </div>

        </header><!-- Menu-hero-edn -->

        <!-- Slider-content -->
        <section class="w-full h-screen relative">
            <!-- Hero Slider -->
            <div class="hero_slider owl-carousel text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bona">

                <!-- Hero Slide -->
                <div class="w-full h-full">
                    <div
                        class="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-[65%_center] lg:bg-right-top bg-[url('../img/inicio/banner-bg.jpg')]">
                    </div>
                    <div class="w-full h-full relative bg-[#0000009d] flex flex-col items-center justify-center">
                        <div class="max-w-[75%] translate-y-[30px] text-center">
                            <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut"
                                class="leading-snug">"Feria regional de investigación e innovación técnica, tecnologica
                                y productiva"
                                <span class="block w-full sm:w-72 md:w-96 mx-auto">ITSA RIBERALTA
                                    2024
                                    <div
                                        class="w-max m-auto bg-secundario text-sm relative after:absolute after:inset-0 after:translate-y-10 hover:after:translate-y-0 after:transition-transform after:bg-naranja z-[1] after:-z-[1] p-2 rounded-sm my-7 text-white hover:text-primario overflow-hidden">
                                        <a href="#" class="active:text-secundario">MAS INFORMACIÓN
                                            AQUÍ..!</a>
                                    </div>
                                </span>
                            </h1>
                        </div>
                    </div>

                </div>

                <!-- Hero Slide -->
                <div class="w-full h-full">
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-[65%_center] lg:bg-right-top bg-[url('../img/inicio/slide2.jpg')]">
                    </div>
                    <div class="w-full h-screen relative bg-[#00000094] flex flex-col items-center justify-center">
                        <div class="max-w-[75%] translate-y-[30px] text-center">
                            <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut"
                                class="leading-snug">"Feria regional de investigación e innovación técnica, tecnologica
                                y productiva"
                                <span class="block w-full sm:w-72 md:w-96 mx-auto">ITSA RIBERALTA
                                    2024
                                    <div
                                        class="w-max m-auto bg-secundario text-sm relative after:absolute after:inset-0 after:translate-y-10 hover:after:translate-y-0 after:transition-transform after:bg-naranja z-[1] after:-z-[1] p-2 rounded-sm my-7 text-white hover:text-primario overflow-hidden">
                                        <a href="#" class="active:text-secundario">MAS INFORMACIÓN
                                            AQUÍ..!</a>
                                    </div>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                <!-- Hero Slide -->
                <div class="w-full h-full">
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-[65%_center] lg:bg-right-top bg-[url('../img/inicio/slide1.jpg')]">
                    </div>
                    <div class="w-full h-screen relative bg-[#00000094] flex flex-col items-center justify-center">
                        <div class="max-w-[75%] translate-y-[30px] text-center">
                            <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut"
                                class="leading-snug">"Feria regional de investigación e innovación técnica, tecnologica
                                y productiva"
                                <span class="block w-full sm:w-72 md:w-96 mx-auto">ITSA RIBERALTA
                                    2024
                                    <div
                                        class="w-max m-auto bg-secundario text-sm relative after:absolute after:inset-0 after:translate-y-10 hover:after:translate-y-0 after:transition-transform after:bg-naranja z-[1] after:-z-[1] p-2 rounded-sm my-7 text-white hover:text-primario overflow-hidden">
                                        <a href="#" class="active:text-secundario">MAS INFORMACIÓN
                                            AQUÍ..!</a>
                                    </div>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
            <!-- iconos -->
            <div
                class="flex flex-wrap md:flex-row max-w-[950px] w-full gap-2 md:gap-4 md:w-4/6 justify-between items-center absolute left-1/2 -translate-x-1/2 bottom-[9vh] landscape:bottom-0 md:bottom-5 z-10 text-white text-[10px] md:text-sm px-1">

                <div class="flex flex-col items-center">
                    <div
                        class="w-max relative outline p-1.5 md:p-2 outline-1 rounded-full after:border-white after:border-[3px] after:opacity-0 after:absolute after:inset-0 after:animate-spin-slow after:rounded-full after:animate-wiggle">
                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/heart.svg" alt="estudiantes total" class="w-8 md:w-auto">
                    </div>
                    <span id="contEstudent">0</span>
                    <span>ESTUDIANTES</span>
                </div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-max relative outline p-1.5 md:p-2 outline-1 rounded-full after:border-white after:border-[3px] after:opacity-0 after:absolute after:inset-0 after:animate-spin-slow after:rounded-full after:animate-wiggle">
                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/hour.svg" alt="horas año" class="w-8 md:w-auto">
                    </div>
                    <span id="contHoras">0</span>
                    <span>CARGA HORARIA</span>
                </div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-max relative outline p-2 md:p-3 outline-1 rounded-full after:border-white after:border-[3px] after:opacity-0 after:absolute after:inset-0 after:animate-spin-slow after:rounded-full after:animate-wiggle">
                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/book.svg" alt="materias" class="w-8 md:w-auto">
                    </div>
                    <span id="contMateria">0</span>
                    <span>MATERIAS</span>
                </div>
                <div class="flex flex-col items-center">
                    <div
                        class="w-max relative outline p-1 outline-1 rounded-full after:border-white after:border-[3px] after:opacity-0 after:absolute after:inset-0 after:animate-spin-slow after:rounded-full after:animate-wiggle">
                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/virrete.svg" alt="cantidad graduados" class="w-10 md:w-auto">
                    </div>
                    <span id="contGraduados">0</span>
                    <span>GRADUADOS 2024</span>
                </div>
            </div><!-- iconos-end -->
            <!-- Control-slider -->
            <div
                class="hidden left-[4.32%] cliLeft sm:flex justify-center items-center absolute top-2/4 -translate-y-12 w-10 md:w-12  h-8 md:h-8 bg-white z-10 cursor-pointer hover:bg-naranja  group/slide transition-all">
                <span class="text-[9px] lg:text-xs font-bold text-[#121212] group-hover/slide:text-white">prev</span>
            </div>
            <div
                class="hidden right-[4.32%] cliRight sm:flex  justify-center items-center absolute top-2/4 -translate-y-12 w-10 md:w-12 h-8 md:h-8 bg-white z-10 cursor-pointer hover:bg-naranja group/slide1 transition-all">
                <span class="text-[9px] lg:text-xs font-bold text-[#121212] group-hover/slide1:text-white">next</span>
            </div><!-- Control-slider-end -->

        </section><!-- Slider-content-end -->

        <!-- Bienvenida -->
        <section class="wrapper">
            <div class="text-black bg-slate-50 py-11 font-bona border-x border-gris">
                <h1
                    class="text-center text-xl md:text-2xl font-bold md:text-left md:ml-5 bg-clip-text text-transparent bg-gradient-to-r from-secundario to-naranja pr-5">
                    " VII FERIA REGIONAL DE INVESTIGACIÓN E INNOVACIóN TÉCNICA, TECNOLOGICA Y PRODUCTIVA 'ITSA RIBERALTA 2024 ”</h1>
                <div class="md:flex">
                    <div class="basis-2/3 p-4">
                        <p class="">La Formacion técnica, Tecnologica y productiva, profesional e integral, esta articulada al desarrollado productivo, sostenible, sustentable y autogestionario, de carácter científico, práctico-teórico y productivo, a través del desarrollo e implementación de proyectos de investigación e innovación técnica, tecnológica y productivo en el <span class="text-red-600">ITSA Riberalta</span> organizado por la carrera de <span class="text-red-600">Veterinaria y Zootecnia</span> y la carrera de <span class="text-red-600">Agropecuaria</span></p>
                        <div
                            class="w-max bg-secundario relative after:absolute after:inset-0 after:translate-y-10 hover:after:translate-y-0 after:transition-transform after:bg-naranja z-[1] after:-z-[1] p-2 rounded-sm my-7 text-white hover:text-primario overflow-hidden">
                            <a href="#" class="active:text-secundario">MAS INFORMACIÓN AQUÍ..!</a>
                        </div>
                    </div>
                    <div class="mx-auto w-max">
                        <img src="inicioP/src/image/inicio/bienvenida.gif" alt="gif de bienvenida" class="w-full">
                    </div>
                </div>
            </div>
        </section> <!-- Bienvenida-end -->

        <!-- Carreras -->
        <main class="w-full bg-[#1a1a1a] py-28 relative">
            <div class="top-0 left-0 w-full h-full absolute">
                <div
                    class="w-full h-full bg-no-repeat bg-cover bg-[61%_center] lg:bg-right-top bg-fixed opacity-25 bg-[url('../img/inicio/slide3.jpg')]">
                </div>
            </div>
            <!-- Carreras-Content -->
            <div class="max-w-[1140px] m-auto w-full text-white">
                <h2 class="text-center text-xl xxl:text-2xl mb-3 lg:mb-6">Nuestras Carreras</h2>

                <div class="text-center text-xl xxl:text-2xl font-bold px-9">
                    <h1
                        class="before:mb-4 before:w-12 before:bg-naranja before:h-1 before:m-auto before:block before:md:w-20">
                        Hay un momento en la vida de cualquier persona para elegir que estudiar</h1>
                </div>
                <!-- Carreras-items -->
                <div class="flex justify-center text-sm xl:text-base">
                    <div class="max-w-[83.33%] mx-[4.33%] lg:mx-[8.33%]">

                        <div class="px-7 mt-14">

                            <div class="owl-carousel owl-theme carreras">

                                <!-- Carrera-item1 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            Formar Técnicos <strong>veterinarios y zootecnistas</strong> con
                                            habilidades
                                            y destrezas para aplicar en la práctica profesional, con sólidos
                                            conocimientos técnicos y científicos para el mejoramiento de la salud y
                                            producción animal...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p8.avif, 
                                                                 inicioP/dist/img/img_carrera/p8.webp, 
                                                                 inicioP/dist/img/img_carrera/p8.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p8.jpg" lazyalt="imagen" width="262"
                                                        height="47" alt="Carrera Veterinaria"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Veterinaria y zootecnia</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item2 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Industria de Alimentos</strong> conocera los
                                            métodos
                                            de procesamiento lácteos, cárnicos, frutas y hortalizas, cereales u
                                            oleaginosas, así como los diversos análisis fisicoquímicos y
                                            microbiológicos...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p5.avif, 
                                                                     inicioP/dist/img/img_carrera/p5.webp, 
                                                                     inicioP/dist/img/img_carrera/p5.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p5.jpg" lazyalt="imagen" width="262"
                                                        height="32" alt="Carrera Ind. Alimentos"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Industrias
                                                    De Alimentos</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Carrera-item3 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El técnico <strong>Informático</strong> conociendo el desarrollo y
                                            administración de sistemas informáticos, con habilidades en análisis y
                                            desarrollo de software, la operación de software ofimático, manipulación
                                            de
                                            metodologías...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p2.avif, 
                                                                    inicioP/dist/img/img_carrera/p2.webp, 
                                                                    inicioP/dist/img/img_carrera/p2.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p2.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera sistemas"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#" class="hover:text-secundario block">Sistemas
                                                    informáticos</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item4 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Administración de Empresas</strong> es un
                                            profesional
                                            emprendedor capaz de crear, administrar y solucionar problemas en las
                                            empresas, organizaciones e instituciones públicas y privadas...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p1.avif, 
                                                                    inicioP/dist/img/img_carrera/p1.webp, 
                                                                    inicioP/dist/img/img_carrera/p1.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p1.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera Adm. Empresas"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Administración de empresas</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item5 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El <strong>Contador General</strong> está formado para ejercer la
                                            profesión,
                                            aplicando normas contables, tributarias, procedimientos administrativos
                                            y
                                            disposiciones legales vigentes, utilizando metodologías científicas y
                                            practicas...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <img loading="lazy" decoding="async" src="inicioP/dist/img/img_carrera/p10.jpg"
                                                    lazyalt="imagen" width="262" height="200" alt="Carrera Contador"
                                                    class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                <%--<picture>
                                                <source srcset="inicioP/dist/img/img_carrera/p10.avif, 
                                                                inicioP/dist/img/img_carrera/p10.webp, 
                                                                inicioP/dist/img/img_carrera/p10.jpg" type="image/jpg">
                                                <img loading="lazy" decoding="async" src="inicioP/dist/img/img_carrera/p10.jpg"
                                                    lazyalt="imagen" width="262" height="200" alt="Carrera Contador"
                                                    class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>--%>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Contador
                                                    general</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item6 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            La profesional en el área <strong>Secretarial</strong> aplica
                                            procedimientos
                                            y sistemas de gestión comunicativa, información y documentación que se
                                            procesa en la empresa; demostrando equilibrio emocional, criterio
                                            lógico,
                                            facilidad de palabra...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p3.avif, 
                                                                        inicioP/dist/img/img_carrera/p3.webp, 
                                                                        inicioP/dist/img/img_carrera/p3.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p3.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera secretariado"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Secretariado ejecutivo</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item7 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Agropecuaria</strong> participar en el desarrollo
                                            de
                                            proyectos agropecuarios, ejecutando actividades de investigación,
                                            asistencia
                                            y extensión, a fin de mejorar la producción animal y vegetal de la
                                            comunidad...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p6.avif, 
                                                                    inicioP/dist/img/img_carrera/p6.webp, 
                                                                    inicioP/dist/img/img_carrera/p6.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p6.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera agropecuaria"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Agropecuaria</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item8 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Mecánica Automotriz</strong> realizará inspección,
                                            mantenimiento, diagnóstico y reparación de vehículos automotrices y
                                            motores
                                            estacionarios, con énfasis en el diagnóstico de sistemas electrónicos...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p9.avif, 
                                                                    inicioP/dist/img/img_carrera/p9.webp, 
                                                                    inicioP/dist/img/img_carrera/p9.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p9.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera mecanica Automotriz"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#" class="hover:text-secundario block">Mecánica
                                                    Automotriz</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item9 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Piscicultura</strong> tiene por objeto el estudio
                                            y
                                            cultivo integral del agua, aplicando técnicas que permitan incrementar
                                            la
                                            producción de seres vivos acuáticos que resulten provechosos para la
                                            comunidad...<span class="text-red-600">(NUEVO)</span>
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p7.avif, 
                                                                    inicioP/dist/img/img_carrera/p7.webp, 
                                                                    inicioP/dist/img/img_carrera/p7.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p7.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera piscicultura"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#"
                                                    class="hover:text-secundario block">Piscicultura</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white">Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Carrera-item10 -->
                                <div class="owl-item">
                                    <div
                                        class="w-full h-[600px] sm:h-[700px] md:h-[650px] pb-20 flex flex-col justify-between text-center xxl:h-[700px]">
                                        <div class="text-4xl text-naranja">« »</div>
                                        <p class="mb-0 flex-grow">
                                            El Técnico en <strong>Turismo</strong> desde una visión general es un
                                            profesional crítico, reflexivo, propositivo, con alto espíritu de
                                            reciprocidad, complementariedad, con alto sentido de identidad cultural
                                            y
                                            patriotica...
                                        </p>
                                        <div class="h-48">
                                            <div
                                                class="w-28 rounded-full overflow-hidden mx-auto shadow-lg shadow-secundario">
                                                <picture>
                                                    <source srcset="inicioP/dist/img/img_carrera/p4.avif, 
                                                                    inicioP/dist/img/img_carrera/p4.webp, 
                                                                    inicioP/dist/img/img_carrera/p4.jpg" type="image/jpg">
                                                    <img loading="lazy" decoding="async"
                                                        src="inicioP/dist/img/img_carrera/p4.jpg" lazyalt="imagen" width="262"
                                                        height="200" alt="Carrera turismo"
                                                        class="w-full aspect-square rounded-full duration-700 hover:scale-125">
                                                </picture>
                                            </div>
                                            <div
                                                class="text-base font-bold uppercase text-naranja mt-8 relative before:w-8 before:bg-secundario before:h-1 before:m-auto before:block">
                                                <a href="#" class="hover:text-secundario">Turismo</a>
                                            </div>
                                            <div class="mt-2 font-medium text-white"> Técnico Superior</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div><!-- Carreras-content-end -->

        </main> <!-- Carreras-end -->

        <!-- Footer -->
        <footer class="w-full pt-20 bg-[#1d2031] bg-[top_center] bg-no-repeat bg-footer-background">
            <div class="wrapper pb-9">

                <div class="pb-10 text-white font-bona">
                    <h1
                        class="font-medium text-3xl text-center before:w-14 before:h-1 before:block before:bg-naranja before:m-auto">
                        FORMA PARTE DE NUESTRO INSTITUTO</h1>
                    <div class="btn mx-auto my-7">
                        <a href="#" class="text-center">INFORMATE</a>
                    </div>
                </div>
                <!-- Footer-content -->
                <div
                    class="flex flex-wrap gap-8 pl-3 md:pl-0 text-white border-y-2 border-solid border-[#4d4e4e] py-20">
                    <!-- Footer-item1 -->
                    <div class="basis-2/5">
                        <!-- Logo -->
                        <div>
                            <img loading="lazy" src="inicioP/dist/img/inicio/logo.png" lazyalt="imagen" 
                            width="129" height="10" alt="Logo ITSA" class="sp:float-left">
                            <!-- <picture>
                                <source srcset="dist/img/inicio/logo.avif, 
                                                dist/img/inicio/logo.webp, 
                                                dist/img/inicio/logo.png" type="image/png">
                                <img loading="lazy" decoding="async" src="dist/img/inicio/logo.png" lazyalt="imagen"
                                    width="159" height="40" alt="Logo ITSA" class="sp:float-left">
                            </picture> -->
                            <p class="mt-6 sp:mt-0">Forma parte de nuestro instituto tecnológico, y date cuenta por ti
                                mismo,
                                que en español nadie te enseña mejor !!</p>
                        </div>

                    </div>
                    <!-- Footer-item2 -->
                    <div class="flex-grow">

                        <div class="font-medium text-lg pb-8">Menu</div>
                        <ul class="space-y-2">
                            <li><a href="#" class="hover:text-naranja">Inicio</a></li>
                            <li><a href="#" class="hover:text-naranja">Acerca
                                    De</a></li>
                            <li><a href="#" class="hover:text-naranja">Multimedia</a>
                            </li>
                            <li><a href="#" class="hover:text-naranja">Admisiones</a>
                            </li>
                            <li><a href="#" class="hover:text-naranja">Inf.Turismo</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Footer-item3 -->
                    <div class="flex-grow">

                        <div class="font-medium text-lg pb-8">Enlaces Utiles</div>
                        <ul class="space-y-2">
                            <li><a href="#" class="hover:text-naranja">Lista de Proyectos</a></li>
                            <li><a href="#" class="hover:text-naranja">Sistemas de Notas</a>
                            </li>
                            <li><a href="#" class="hover:text-naranja">Gestión de Proyectos</a>
                            </li>
                            <li><a href="#" class="hover:text-naranja">Galeria</a></li>
                            <li><a href="#" class="hover:text-naranja">Evaluacion de Desempeño</a></li>
                        </ul>

                    </div>
                    <!-- Footer-item4 -->
                    <div class="flex-grow">
                        <h2 class="font-medium text-lg pb-8">Contactos</h2>
                        <ul class="space-y-2">
                            <li class="flex items-center gap-4">
                                <div class="footer_contact_icon w-7">
                                    <img src="https://www.itsariberalta.edu.bo/src/image/inicio/ubicacion.svg" class="fill-white" alt="ubicación">
                                </div>
                                Itsa-palmeras
                            </li>
                            <li>
                                <a href="tel:+591 03 72649743"
                                    class="flex items-center gap-4 max-w-max hover:text-naranja">
                                    <div class="w-7">
                                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/cellphone.svg" alt="teléfono">
                                    </div>
                                    +591 72649743
                                </a>
                            </li>
                            <li>
                                <a href="mailto:support@colorlib.com"
                                    class="flex items-center gap-4 max-w-max hover:text-naranja">
                                    <div class="w-7">
                                        <img src="https://www.itsariberalta.edu.bo/src/image/inicio/email.svg" alt="email">
                                    </div>contactos@itsariberalta.edu.bo
                                </a>
                            </li>
                        </ul>

                    </div>

                </div><!-- Footer-content-end -->
                <!-- Footer-Copyright -->
                <div class="flex justify-between gap-4 flex-col sm:flex-row pt-5 items-center">

                    <div class="basis-full text-center md:text-left">
                        <span class="">
                            Copyright &copy; 2024<img src="https://www.itsariberalta.edu.bo/src/image/inicio/devZ.svg" alt=""
                                class="w-10 inline-block">||
                            Itsa Riberalta <i class="fa fa-heart" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="basis-1/3">

                        <ul class="flex justify-around gap-7 md:gap-0 text-white">
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-full bg-secundario grid place-items-center">
                                <a href="https://api.whatsapp.com/send?phone=59169391180" target="_blank"><i
                                        class="fab fa-whatsapp"></i></a>
                            </li>
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-full bg-secundario grid place-items-center">
                                <a href="https://www.facebook.com/itsariberalta/"><i class="fab fa-facebook-f"></i></a>
                            </li>
                            <li
                                class="w-9 h-9 hover:text-secundario hover:scale-[1.8] transition duration-500 hover:bg-transparent rounded-full bg-secundario grid place-items-center">
                                <a href="https://www.youtube.com/@itsariberalta8717" target="_blank"><i
                                        class="fab fa-youtube"></i></a>
                            </li>
                        </ul>

                    </div>

                </div><!-- Footer-Copyright-end -->
            </div>

        </footer><!-- Footer-end -->

    </div>

    <script src="inicioP/src/js/jquery.min.js"></script>
    <script src="inicioP/plugins/owlcarousel/owl.carousel.js"></script>
    <script src="inicioP/src/js/app.js" defer></script>
</body>

</html>
