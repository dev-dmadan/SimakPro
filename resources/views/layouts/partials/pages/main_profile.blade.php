<div class="row mb-3">
    <div class="col">
        <div id="layout-main-profile" class="card">
            <div class="card-body">

                @if ($isProfileImageExists)
                    @include('layouts.partials.pages.image_profile')
                @endif
        
                @include('layouts.shimmers.page.main_profile')

                <div class="row d-none">
                    <div class="col">
                        
                        @yield('main-profile')

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>