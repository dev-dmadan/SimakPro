@extends('layouts.section')

{{-- section title --}}
@section('section-title', 'Proyek')

{{-- button new id --}}
@section('section-new-button-id', 'project-new-button')

{{-- button new title --}}
@section('section-new-button-title', 'Tambah')

{{-- section breadcrumb --}}
@section('breadcrumb')
    <li class="breadcrumb-item active">Proyek</li>
@endsection

{{-- table --}}
@section('table')
    <table id="project-table" class="table table-striped">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Nama Proyek</th>
                <th>Pemilik</th>
                <th>Kota</th>
                <th>Progress</th>
                <th>Total</th>
                <th>Sisa</th>
                <th>Status</th>
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
    <script type="module" src="{{ asset('js/app/project/list.js') }}"></script>

@endsection