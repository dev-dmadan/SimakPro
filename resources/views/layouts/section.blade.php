@extends('layouts.blank')

@section('content')
    
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">@yield('section-title')</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        @yield('breadcrumb')
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                            @include('layouts.shimmers.section.section')

                            <div class="d-none">
                                {{-- button group --}}
                                <div class="row">
                                    <div class="col-8">
                                        <button type="button" class="btn btn-success mr-2" id="@yield('section-new-button-id')">@yield('section-new-button-title')</button>
                                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="actions-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                        <div class="dropdown-menu" aria-labelledby="actionsButton">
                                            <a class="dropdown-item" href="javascript:void(0)">Export excel</a>
                                            <a class="dropdown-item disabled" href="javascript:void(0)">Import excel <span class="badge badge-primary">Coming Soon</span></a>
                                            <a class="dropdown-item disabled" href="javascript:void(0)">Select multiple records <span class="badge badge-primary">Coming Soon</span></a>
                                            <a class="dropdown-item disabled" href="javascript:void(0)">Select all <span class="badge badge-primary">Coming Soon</span></a>
                                        </div>
                                        @yield('custom-button')
                                    </div>
                                    <div class="col-4">
                                        <div class="float-right">
                                            <button class="btn btn-outline-secondary" type="button" id="refresh-button"><i class="fas fa-sync-alt"></i></button>
                                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="view-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">View</button>
                                            <div class="dropdown-menu" aria-labelledby="viewButton">
                                                <a class="dropdown-item disabled" href="javascript:void(0)">Show/hide columns <span class="badge badge-primary">Coming Soon</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {{-- filter --}}
                                <div class="row ml-0 mt-2">
                                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filters</a>
                                    <div class="dropdown-menu" aria-labelledby="filters-button">
                                        <a class="dropdown-item" id="filters-button-add-filter" href="javascript:void(0)">Add filters</a>
                                        <a class="dropdown-item disabled" id="filters-button-advance-filter" href="javascript:void(0)">Advanced filters <span class="badge badge-primary">Coming Soon</span></a>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="table-responsive mt-2">
                                            @yield('table')
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.card -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->

            @yield('custom-content')
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->

    @yield('modal-content')
    
@endsection