<div class="modal fade" id="@yield('modal-id')" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="@yield('modal-id')Label" aria-hidden="true">
    <div class="modal-dialog @yield('modal-size')">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="@yield('modal-id')Label">@yield('modal-title')</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                @yield('modal-body')
            </div>
            <div class="modal-footer">
                @yield('modal-custom-button')
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>