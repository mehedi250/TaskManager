<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'TASK MANAGER') }}</title>

    <link rel="icon" type="image/x-icon" href="{{asset('assets/images/favicon.png')}}">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
    <link href="{{ asset('assets/styles/main.css') }}" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Lato:wght@400;700&family=Lobster&family=Lobster+Two&family=Mulish:wght@400;700&family=Poppins:wght@400;700&family=Teko:wght@400;700&display=swap" rel="stylesheet">


    <script>
        var baseUrl = '{{env('REACT_APP_API_URL')}}';
        var appUrl = '{{env('APP_URL')}}'
    </script>
</head>

<body>
    <div id="app" class="d-flex flex-column min-vh-100">

    </div>
</body>
</html>
