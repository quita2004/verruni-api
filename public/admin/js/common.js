const btnCreate = $('.btn-create-entity');
const btnUpdate = $('.btn-update-entity');
// var dataTable = $('#dataTable').DataTable();

$(() => {
  $("input[data-image]").on('change', function () {
    const name = $(this).data('image');

    previewImage(this, $(`[data-image-show=${name}]`));
  });

  $("input[data-image-show]").on('click', function () {
    $("input[data-image]").click();
  });

  $(".btn-create-entity").on('click', function () {
    const formName = $(this).data('form');
    const url = $(this).data('url');

    createEntity(formName, url);
  });

  $('.button-show-create').on('click', function () {
    clearForm('.form-modal-create');
    btnCreate.show();
    btnUpdate.hide();
  });

  $('body').on('click', '.q-button-edit', function () {
    clearForm('.form-modal-create');
    btnCreate.hide();
    btnUpdate.show();

    const id = $(this).data('id');
    const url = $(this).data('url');
    loadDataUpdate(id, url);
  });

  $('body').on('click','.btn-update-entity', function () {
    const formName = $(this).data('form');
    const url = $(this).data('url');
    updateEntity(formName, url);
  });

  $('body').on('click', '.q-button-delete', function () {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      const id = $(this).data('id');
      const url = $(this).data('url');
      deleteEntity(id, url);
    }
  });

  $('.summernote').summernote({
    minHeight: 300
  });
});

function previewImage(input, target) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      target.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

function showDataUpdate(data, form) {
  const inputs = $(form).find("[data-name]");
  inputs.each(function () {
    const name = $(this).data('name');
    if (name) {
      const type = $(this).data('type');
      if (type === "text") {
        $(this).val(data[name]);
      }

      if (type === "file") {
        $(`input[data-image-show=${name}]`).attr('src', data[name]);
      }

      if (type === "summernote") {
        $(this).summernote('code', data[name]);
      }
    }
  });
}

function getFormData(form) {
  const formData = new FormData();
  const inputs = $(form).find("[data-name]");
  inputs.each(function () {
    const name = $(this).data('name');
    if (name) {
      const type = $(this).data('type');
      if (type === "text") {
        const data = $(this).val();
        if (data) {
          formData.append(name, data);
        }
      }

      if (type === "file") {
        const data = $(this).get(0).files[0];
        if (data) {
          formData.append(name, data);
        }
      }

      if (type === "summernote") {
        const data = $(this).summernote('code');
        if (data) {
          formData.append(name, data);
        }
      }
    }
  });

  return formData;
}

function loadDataUpdate(id, url) {
  function onSuccess(res) {
    const data = res.data;
    if (data) {
      showDataUpdate(data, '.form-modal-create');
    } else {
      toastr.error('Không tìm thấy dữ liệu');
    }
  }
  $.ajax({
    url: url + '/' + id,
    type: 'GET',
    success: onSuccess
  });
}

function onSucces(res) {
  toastr.success(res.message);
  setTimeout(function () {
    location.reload();
  }, 500);
};
function onError(res) {
  toastr.error("Đã xảy ra lỗi");
};

function updateEntity(form, url) {
  const formData = getFormData(form);
  $.ajax({
    url: url + '/update',
    method: 'POST',
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    success: onSucces,
    error: onError
  });
}

function createEntity(form, url) {
  const formData = getFormData(form);
  $.ajax({
    url: url,
    method: 'POST',
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    success: onSucces,
    error: onError
  });
}

function clearForm(form) {
  const inputs = $(form).find("[data-name]");
  $('input[type=image]').attr('src', '/images/noimage.png');
  inputs.each(function () {
    if ($(this).data('type') === 'summernote') {
      $(this).summernote('code', '')
    } else {
      $(this).val('');
    }
  });

  $('select[data-name]').each(function () {
    $(this).get(0).selectedIndex = '0';
  });
}

function deleteEntity(id, url) {
  $.ajax({
    url: url + '/delete/' + id,
    method: 'POST',
    type: 'POST',
    processData: false,
    contentType: false,
    data: null,
    success: onSucces,
    error: onError
  });
}