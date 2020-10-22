@extends('layouts.section')

{{-- section title --}}
@section('section-title', $title)

{{-- button new id --}}
@section('section-new-button-id', 'contact-new-button')

{{-- button new title --}}
@section('section-new-button-title', 'Tambah')

{{-- section breadcrumb --}}
@section('breadcrumb')
    @if ($isContact)

        <li class="breadcrumb-item active">{{ $title }}</li>

    @else

        <li class="breadcrumb-item">Kontak</li>
        <li class="breadcrumb-item active">{{ $title }}</li>

    @endif
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
    @include('pages.contact.modal')

@endsection

@section('custom-css')

    {{-- your custom css --}}
    {{-- can use link href / style tag --}}

@endsection

@section('custom-js')

    {{-- your custom js --}}
    <script>
        const _isContact = @json($isContact, JSON_PRETTY_PRINT);
        const _isKasBesar = @json($isKasBesar, JSON_PRETTY_PRINT);
        const _isKasKecil = @json($isKasKecil, JSON_PRETTY_PRINT);
        const _isSubKasKecil = @json($isSubKasKecil, JSON_PRETTY_PRINT);
    </script>
    <script type="module" src="{{ asset('js/app/contact/list.js') }}"></script>

@endsection