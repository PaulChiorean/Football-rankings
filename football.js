
$(document).ready(function() {
    $(".country-list .collapse .btn").click(function () {
        $("#ranking").show();
    });

    $(".ranking table tbody tr").click(function () {
        $("#team").show();
    });
});
