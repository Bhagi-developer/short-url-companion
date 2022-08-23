let saveBtn = document.querySelector("#save");
let api = document.querySelector("#myapi");
let toastError = document.querySelector(".toast-error");
let toastSuccess = document.querySelector(".toast-success");
let isError = false;

saveBtn.addEventListener("click", () => {
  if (api.value) {
    toastSuccess.classList.remove("d-hide");

    // storing the data in extension
    chrome.storage.local.set({ API: api.value }, function () {
      console.log("Value is set to " + api.value);
    });
  } else {
    api.value = null;
    toastError.classList.remove("d-hide");
    toastSuccess.classList.add("d-hide");

    setTimeout(() => {
      toastError.classList.add("d-hide");
    }, 1500);
  }
});
