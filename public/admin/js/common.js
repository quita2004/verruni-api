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

function createEntity(form, url) {
  const formData = getFormData(form);
  $.ajax({
    url: url,
    method: 'POST'
  })
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

      if(type === "file"){
        const data = this.files[0];
        console.log("getFormData -> data", data)
        formData.append(name, data);
      }
    }
  });

}