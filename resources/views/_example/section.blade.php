@extends('layouts.section')

{{-- section title --}}
@section('section-title', 'Example section')

{{-- button new id --}}
@section('section-new-button-id', 'example-new-button')

{{-- button new title --}}
@section('section-new-button-title', 'New')

{{-- section breadcrumb --}}
@section('breadcrumb')
    <li class="breadcrumb-item"><a href="javascript:void(0)">Example 1</a></li>
    <li class="breadcrumb-item active">Example 2</li>
@endsection

{{-- section custom button --}}
@section('custom-button')
    <button class="btn btn-info ml-2">Custom</button>
@endsection

{{-- table --}}
@section('table')
    <table class="table table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Birthday</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Haha</td>
                <td>20 Feb 2020</td>
                <td>0812345678</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Haha</td>
                <td>20 Feb 2020</td>
                <td>0812345678</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Haha</td>
                <td>20 Feb 2020</td>
                <td>0812345678</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Haha</td>
                <td>20 Feb 2020</td>
                <td>0812345678</td>
            </tr>
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

@endsection