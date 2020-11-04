<div class="row mb-3">
    <div class="col">
        <div class="card">
            <div class="card-body">
        
                @include('layouts.shimmers.page.main_content')
               
                <div id="layout-main-content" class="d-none">
                   
                    @yield('main-content')
                
                </div>
            </div>
        </div>
    </div>
</div>