<!-- NAV -->
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <a href="#inicio" class="flex items-center gap-3">
                <img src="{{ asset('images/logo_centro_podologia_carrera.webp') }}" alt="Logo Centro Podología Carrera"
                    class="h-12 w-12 rounded-full" />
                <div class="leading-none">
                    <p class="font-semibold text-slate-900">Clínica Podológica</p>
                    <p class="text-xs text-slate-500">Carrera</p>
                </div>
            </a>

            <nav class="hidden md:flex items-center gap-8 text-sm">
                <a href="#inicio" class="hover:text-slate-900 text-slate-700">Inicio</a>
                <a href="#servicios" class="hover:text-slate-900 text-slate-700">Servicios</a>
                <a href="#equipo" class="hover:text-slate-900 text-slate-700">Equipo</a>
                <a href="#precios" class="hover:text-slate-900 text-slate-700">Precios</a>
                <a href="#blog" class="hover:text-slate-900 text-slate-700">Blog</a>
                <a href="#contacto" class="hover:text-slate-900 text-slate-700">Contacto</a>
            </nav>

            <div class="hidden md:flex items-center gap-3">
                <a href="tel:+34912268858"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5A2.25 2.25 0 0 0 21 19.5v-1.05a1.5 1.5 0 0 0-1.116-1.45l-3.27-.817a1.5 1.5 0 0 0-1.747.87l-.53 1.24a12.04 12.04 0 0 1-6.613-6.613l1.24-.53a1.5 1.5 0 0 0 .87-1.747l-.817-3.27A1.5 1.5 0 0 0 7.05 3.75H6A2.25 2.25 0 0 0 3.75 6v.75z" />
                    </svg>
                    Llamar
                </a>
                <a href="https://wa.me/34696526425" target="_blank" rel="noopener"
                    class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2 .5 3.9 1.5 5.6L0 24l6.6-1.9C8.2 22.7 10.1 23.2 12 23.2 18.6 23.2 24 17.8 24 11.2c0-3.3-1.2-6.3-3.5-7.7zM12 21.1c-1.6 0-3.2-.4-4.6-1.3l-.3-.2-3.9 1.1 1.1-3.8-.2-.4C3.1 15 2.7 13.6 2.7 12 2.7 6.9 6.9 2.7 12 2.7c2.5 0 4.9 1 6.7 2.8 1.8 1.7 2.8 4.2 2.8 6.6 0 5.1-4.2 9-9.5 9z" />
                        <path
                            d="M17.3 14.9c-.2-.1-1.2-.6-1.4-.7s-.3-.1-.4.1c-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2 0-.4-.1-.2-.6-1.1-.8-1.5-.2-.4-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.4.5.2.9.3 1.2.4.5.2 1 .2 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3z" />
                    </svg>
                    WhatsApp
                </a>
            </div>

            <button id="menuBtn"
                class="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-300 p-2">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
    </div>

    <div id="mobileNav" class="md:hidden hidden border-t border-slate-200">
        <div class="px-4 py-3 flex flex-col gap-3 text-sm">
            <a href="#inicio" class="text-slate-700">Inicio</a>
            <a href="#servicios" class="text-slate-700">Servicios</a>
            <a href="#equipo" class="text-slate-700">Equipo</a>
            <a href="#precios" class="text-slate-700">Precios</a>
            <a href="#blog" class="text-slate-700">Blog</a>
            <a href="#contacto" class="text-slate-700">Contacto</a>
            <div class="flex gap-2">
                <a href="tel:+34912268858"
                    class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium">
                    Llamar
                </a>
                <a href="https://wa.me/34696526425" target="_blank" rel="noopener"
                    class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    WhatsApp
                </a>
            </div>
        </div>
    </div>
</header>