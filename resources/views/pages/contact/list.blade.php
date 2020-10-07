@php
    $title = '';
    if($isKasBesar) {
        $title = 'Kas Besar';
    } else if($isKasKecil) {
        $title = 'Kas Kecil';
    } else if($isSubKasKecil) {
        $title = 'Sub Kas Kecil';
    } else {
        $title = 'Kontak';
    }
@endphp

@extends('layouts.section')

{{-- section title --}}
@section('section-title', 'Kontak')

{{-- button new id --}}
@section('section-new-button-id', 'contact-new-button')

{{-- button new title --}}
@section('section-new-button-title', 'Tambah')

{{-- section breadcrumb --}}
@section('breadcrumb')
    <li class="breadcrumb-item active">Kontak</li>
@endsection

{{-- table --}}
@section('table')
    <table id="contact-table" class="table table-striped">
        <thead>
            <tr>
                @if ($isKasBesar)
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Jenis Kontak</th>
                    <th>Status</th>
                @elseif ($isKasKecil || $isSubKasKecil)
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Saldo</th>
                    <th>Status</th>
                @else
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Jenis Kontak</th>
                    <th>Status</th>
                @endif
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
@endsection

@section('modal-content')

    {{-- your modals --}}
    {{-- can use include / code manualy here --}}

@endsection

@section('custom-css')

    {{-- your custom css --}}
    {{-- can use link href / style tag --}}

@endsection

@section('custom-js')

    {{-- your custom js --}}
    <script>
        const isContact = @json($isContact, JSON_PRETTY_PRINT);
        const isKasBesar = @json($isKasBesar, JSON_PRETTY_PRINT);
        const isKasKecil = @json($isKasKecil, JSON_PRETTY_PRINT);
        const isSubKasKecil = @json($isSubKasKecil, JSON_PRETTY_PRINT);
    </script>
    <script type="module" src="{{ asset('js/app/contact/list.js') }}"></script>

@endsection