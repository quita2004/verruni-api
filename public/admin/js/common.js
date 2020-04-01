let baseUrl;

$(() => {
  baseUrl = $('#base-url').val();


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
  });

  $('.q-button-edit').on('click', function () {
    clearForm('.form-modal-create');

    const id = $(this).data('id');
    loadDataUpdate(id);
    updateEntity(id);
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
  const inputs = $(form).find("input[data-name]");
  inputs.each(function () {
    const name = $(this).data('name');
    if (name) {
      const type = $(this).data('type');
      if (type === "text") {
        $(this).val(data[name]);
      }

      if (type === "file") {
        $(`input[data-image-show=${name}]`).attr('src','/uploads/images/'+  data[name]);
      }
    }
  });
}

function loadDataUpdate(id) {
  function onSuccess(res) {
    const data = res.data;
    showDataUpdate(data, '.form-modal-create');
  }
  $.ajax({
    url: baseUrl + id,
    type: 'GET',
    success: onSuccess
  });
}

function updateEntity(form, id) {
  
}

function createEntity(form, url) {
  function onSucces(res) {
    toastr.success(res.message);
    location.reload();
  };
  function onError(res) {
    toastr.error(res.message);
  };

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

function getFormData(form) {
  const formData = new FormData();
  const inputs = $(form).find("input[data-name]");
  inputs.each(function () {
    const name = $(this).data('name');
    if (name) {
      const type = $(this).data('type');
      if (type === "text") {
        const data = $(this).val();
        formData.append(name, data);
      }

      if (type === "file") {
        const data = $(this).get(0).files[0];
        formData.append(name, data);
      }
    }
  });

  return formData;
}

function clearForm(form) {
  const inputs = $(form).find("input");
  inputs.each(function () {
    if ($(this).attr('type') === 'image') {
      $(this).attr('src', '/images/noimage.png');
    } else {
      $(this).val('');

    }
  });
}