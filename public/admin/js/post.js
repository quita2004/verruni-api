var tablePost = $('#dataTable').DataTable({
    ordering: false,
    initComplete: function () {
        this.api().columns(1).every(function () {
            var column = this;
            var select = $('<select class="form-control"><option value="">Tất cả</option></select>')
                .appendTo($(column.header()))
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
        });
    }
});