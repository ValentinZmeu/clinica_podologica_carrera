<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>@yield('title', 'Clínica Podológica Carrera')</title>
        <meta name="description"
            content="@yield('description', 'Estudios biomecánicos, plantillas a medida, quiropodia y más en Móstoles.')" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="{{ asset('assets/style.css') }}" />
        @stack('styles')
    </head>

    <body class="antialiased text-slate-800">
        @include('components.navbar')

        <main>
            @yield('content')
        </main>

        @include('components.footer')
        @include('components.whatsapp-float')

        <script src="{{ asset('assets/scripts.js') }}"></script>
        @stack('scripts')
    </body>

</html>