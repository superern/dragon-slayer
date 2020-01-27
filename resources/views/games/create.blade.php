@extends('layouts.app')

@section('content')
    <div id="CreateGame" data-name="{{ auth()->user()->name }}"></div>
@endsection
