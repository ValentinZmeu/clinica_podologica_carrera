@extends('layouts.app')

@section('title', 'Clínica Podológica Carrera - Especialistas en Podología en Móstoles')

@section('description', 'Clínica especializada en podología en Móstoles. Tratamientos de uñas encarnadas, plantillas
personalizadas, quiropedia y más. Primera consulta gratuita.')

@section('content')
@include('sections.hero')
@include('sections.features')
@include('sections.services')
@include('sections.process')
@include('sections.testimonials')
@include('sections.contact')
@endsection