<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>SimakPro</title>

        {{-- css --}}
            <link rel="stylesheet" href="{{ asset('css/app.css') }}">
            @yield('custom-css')
        {{-- end css --}}
    </head>
    <body class="hold-transition sidebar-mini text-sm">
        <div class="wrapper">
            
            {{-- navbar --}}
                @include('layouts.partials.navbar')
            {{-- end navbar --}}

            {{-- sidebar --}}
                @include('layouts.partials.sidebar')
            {{-- end sidebar --}}
            
            {{-- content --}}
                <div class="content-wrapper">
                    @yield('content')
                </div>
            {{-- end content --}}

            {{-- footer --}}
                @include('layouts.partials.footer')
            {{-- end footer --}}

        </div>
        <!-- ./wrapper -->

        {{-- js --}}
            <script>
                const APP_URL = @json(env('APP_URL'), JSON_PRETTY_PRINT);
            </script>
            <script src="{{ asset('js/app.js') }}"></script>
            @yield('custom-js')
        {{-- end js --}}
    </body>
</html>