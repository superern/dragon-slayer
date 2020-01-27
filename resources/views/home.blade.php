@extends('layouts.app')

@section('content')
    <div id="Dashboard" data-name="{{ auth()->user()->name }}"></div>
@endsection
