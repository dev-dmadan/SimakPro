@extends('layouts.page')

{{-- page title --}}
@section('page-title', 'Example page')

{{-- input hidden page id --}}
@section('page-id', 'example-id')

{{-- page breadcrumb --}}
@section('breadcrumb')
    <li class="breadcrumb-item"><a href="javascript:void(0)">Example 1</a></li>
    <li class="breadcrumb-item active">Example 2</li>
@endsection

{{-- page custom button --}}
@section('custom-button')
    <button class="btn btn-info">Custom</button>
@endsection

{{-- main profile --}}
@section('main-profile')
    
    {{-- your main profile --}}
    <div class="form-group">
        <label for="example1">Name</label>
        <input type="text" class="form-control" id="example1" placeholder="Enter Name">
    </div>
    <div class="form-group">
        <label for="example2">Type</label>
        <select class="form-control" id="example2">
            <option selected value="">Choose Type</option>
        </select>
    </div>

@endsection

{{-- sub profile --}}
@section('sub-profile')

    {{-- your sub profile --}}
    <div class="form-group">
        <label for="example3">Name</label>
        <input type="text" class="form-control" id="example3" placeholder="Enter Name">
    </div>
    <div class="form-group">
        <label for="example4">Type</label>
        <select class="form-control" id="example4">
            <option selected value="">Choose Type</option>
        </select>
    </div>
    
@endsection

{{-- custom profile --}}
@section('custom-profile')
    
    {{-- your custom profile --}}

@endsection

{{-- main content --}}
@section('main-content')
    
    {{-- your main content --}}
    <div class="form-group form-row">
        <div class="col-md-6">
            <label for="example5">Name</label>
            <input type="text" class="form-control" id="example5" placeholder="Enter Name">
        </div>
    
        <div class="col-md-6">
            <label for="example6">Name</label>
            <select class="form-control" id="example6">
                <option selected value="">Choose Name</option>
            </select>
        </div>
    </div>
    <div class="form-group form-row">
        <div class="col-md-6">
            <label for="example7">Name</label>
            <input type="text" class="form-control" id="example7" placeholder="Enter Name">
        </div>
    
        <div class="col-md-6">
            <label for="example8">Name</label>
            <select class="form-control" id="example8">
                <option selected value="">Choose Namee</option>
            </select>
        </div>
    </div>
    <div class="form-group form-row">
        <div class="col-md-6">
            <label for="example9">Name</label>
            <input type="text" class="form-control" id="example9" placeholder="Enter Name">
        </div>
    
        <div class="col-md-6">
            <label for="example10">Name</label>
            <select class="form-control" id="example10">
                <option selected value="">Choose Name</option>
            </select>
        </div>
    </div>
    <div class="form-group form-row">
        <div class="col-md-6">
            <label for="example11">Name</label>
            <input type="text" class="form-control" id="example11" placeholder="Enter Name">
        </div>
    
        <div class="col-md-6">
            <label for="example12">Name</label>
            <select class="form-control" id="example12">
                <option selected value="">Choose Name</option>
            </select>
        </div>
    </div>

@endsection

{{-- detail content --}}
@section('detail-content')
    
    {{-- your detail profile --}}
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_example1">
                Example 1
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#tab_example2">
                Example 2
            </a>
        </li>
    </ul>
    <div class="tab-content">
    
        {{-- tab example 1 --}}
        <div id="tab_example1" class="tab-pane active">    
            <div class="my-3"></div>

            <div class="form-group form-row">
                <div class="col-md-6">
                    <label for="example13">Name</label>
                    <input type="text" class="form-control" id="example13" placeholder="Enter Name">
                </div>
    
                <div class="col-md-6">
                    <label for="example14">Name</label>
                    <select class="form-control" id="example14">
                        <option selected value="">Choose Name</option>
                    </select>
                </div>
            </div>
    
            <div class="form-group form-row">
                <div class="col-md-6">
                    <label for="example15">Name</label>
                    <select class="form-control" id="example15">
                        <option selected value="">Choose Name</option>
                    </select>
                </div>
    
                <div class="col-md-6">
                    <label for="example16">Name</label>
                    <select class="form-control" id="example16">
                        <option selected value="">Choose Name</option>
                    </select>
                </div>
            </div>
    
            <hr class="pb-2">
    
            {{-- address detail --}}
            <button type="button" class="btn btn-outline-secondary mb-2" id="new-button-addresses">Addresses +</button>
            <div class="table-responsive">
                <table class="table table-striped" id="account-table-addresss-detail">
                    <thead>
                        <tr>
                            <th>Address Type</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Zip Postal Code</th>
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr>
                            <td>Actual</td>
                            <td>Jl. Benda Bawah No.64 Kemang Jakarta Selatan</td>
                            <td>Jakarta</td>
                            <td>Indonesia</td>
                            <td>1404</td>
                        </tr>
                        <tr>
                            <td>Actual</td>
                            <td>Jl. Benda Bawah No.64 Kemang Jakarta Selatan</td>
                            <td>Jakarta</td>
                            <td>Indonesia</td>
                            <td>1404</td>
                        </tr>
                        <tr>
                            <td>Actual</td>
                            <td>Jl. Benda Bawah No.64 Kemang Jakarta Selatan</td>
                            <td>Jakarta</td>
                            <td>Indonesia</td>
                            <td>1404</td>
                        </tr>
    
                    </tbody>
                </table>
            </div>
            
        </div>
    
        {{-- tab example 2 --}}
        <div id="tab_example2" class="tab-pane">
            <div class="my-3"></div>
    
            {{-- contact detail --}}
            <button type="button" class="btn btn-outline-secondary mb-2" id="new-button-contact">Contact +</button>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Contact Name</th>
                            <th>Email</th>
                            <th>Phone text</th>
                            <th>Job Title</th>
                            <th>Zip Postal Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Supervisor</td>
                            <td>Supervisor</td>
                            <td>Jakarta</td>
                            <td>Supervisor</td>
                            <td>16033</td>
                        </tr>
                        <tr>
                            <td>Supervisor</td>
                            <td>Supervisor</td>
                            <td>Jakarta</td>
                            <td>Supervisor</td>
                            <td>16033</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="my-3"></div>
    
            {{-- lead detail --}}
            <button type="button" class="btn btn-outline-secondary mb-2" id="new-button-lead">Lead +</button>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer Need</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Supervisor</td>
                            <td>Jakarta</td>
                            <td>Supervisor</td>
                        </tr>
                        <tr>
                            <td>Supervisor</td>
                            <td>Jakarta</td>
                            <td>Supervisor</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>

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