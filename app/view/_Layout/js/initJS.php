<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED);
$__sidebar_list = isset($_SESSION['sess_sidebar']) && !empty($_SESSION['sess_sidebar']) ? $_SESSION['sess_sidebar'] : null;
$__userData = isset($_SESSION['sess_user']) && !empty($_SESSION['sess_user']) ? $_SESSION['sess_user'] : null;
?>

<!-- Global Variable -->
<script>
    const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    const SITE_URL = <?php echo json_encode(SITE_URL); ?>;
    const USE_JWT = <?php echo json_encode(USE_JWT); ?>;
    const USER_DATA = <?php echo json_encode($__userData); ?>;
    const SIDEBAR_LIST = <?php echo json_encode($__sidebar_list); ?>;
    const QUERY_STRING_AUTH = <?php echo json_encode(QUERY_STRING_AUTH); ?>;
    const PUSHER_KEY = <?php echo json_encode(PUSHER_KEY); ?>;
    const PUSHER_CLUSTER = <?php echo json_encode(PUSHER_CLUSTER); ?>;
</script>

<script src="<?= ADMIN_LTE. 'plugins/jquery/jquery.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/jquery-ui/jquery-ui.min.js'; ?>"></script>
<script src="https://js.pusher.com/5.1/pusher.min.js"></script>
<script>
    Pusher.logToConsole = true;
    const PUSHER = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
        forceTLS: true
    });
</script>
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<script src="<?= ADMIN_LTE. 'plugins/bootstrap/js/bootstrap.bundle.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/datatables/jquery.dataTables.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/datatables-bs4/js/dataTables.bootstrap4.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/datatables-responsive/js/dataTables.responsive.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/datatables-responsive/js/responsive.bootstrap4.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/chart.js/Chart.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/moment/moment.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/daterangepicker/daterangepicker.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/summernote/summernote-bs4.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/sweetalert2/sweetalert2.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/toastr/toastr.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'plugins/select2/js/select2.full.min.js'; ?>"></script>
<script src="<?= ADMIN_LTE. 'dist/js/adminlte.js'; ?>"></script>
<script type="module" src="<?= BASE_URL. 'app/view/_Layout/js/init.js'; ?>"></script>
<?= $__js; ?>