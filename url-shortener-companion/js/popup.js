let generateBtn = document.querySelector("#shortURL");
let api = document.querySelector("#myurl");
let toastError = document.querySelector(".toast-error");
let toastSuccess = document.querySelector(".toast-success");
let loader = document.querySelector(".loading");
let copy = document.querySelector(".copy");
let copyMessage = document.querySelector(".text-primary");
let alert = document.querySelector(".alert");
let confirm = document.querySelector(".confirm");
let alertbtn = document.querySelector(".alert-btn");
let confirmokbtn = document.querySelector(".confirmok-btn");
let confirmcancelbtn = document.querySelector(".confirmcancel-btn");

const url = new URL("https://t.ly/api/v1/link/shorten");
let shortUrl = "";
let alertShow = false;
let confirmShow = false;

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(shortUrl);
  copyMessage.textContent = "copied on clipboard";
  copyMessage.classList.add("text-primary");
  copyMessage.classList.remove("text-error");
  copyMessage.classList.remove("d-hide");
});

alertbtn.addEventListener("click", () => {
  alert.classList.add("d-hide");

  confirm.classList.remove("d-hide");
});

confirmokbtn.addEventListener("click", () => {
  confirm.classList.add("d-hide");
  toastSuccess.textContent = shortUrl;
  toastSuccess.classList.remove("d-hide");
  copy.classList.remove("d-hide");
  copyMessage.textContent = "You might get wrong url for wrong input";
  copyMessage.classList.add("text-error");
  copyMessage.classList.remove("text-primary");
  copyMessage.classList.remove("d-hide");
});

confirmcancelbtn.addEventListener("click", () => {
  confirm.classList.add("d-hide");
  toastSuccess.classList.remove("d-hide");
  toastSuccess.textContent = "kindly go to Options for more detais!";
  copy.classList.add("d-hide");
  copyMessage.classList.add("d-hide");
});

generateBtn.addEventListener("click", () => {
  if (api.value) {
    loader.classList.remove("d-hide");
    chrome.storage.local.get(["API"], function (result) {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          long_url: api.value,
          domain: "https://t.ly/",
          api_token: result.API,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          shortUrl = json.short_url;
          loader.classList.add("d-hide");
          if (json.short_url.search("rebrand") != -1) {
            toastSuccess.classList.add("d-hide");
            copy.classList.add("d-hide");
            copyMessage.classList.add("d-hide");

            alert.classList.remove("d-hide");
            alertShow = true;
          } else {
            toastSuccess.classList.remove("d-hide");
            toastSuccess.textContent = json.short_url;
            copy.classList.remove("d-hide");
            copyMessage.textContent = "You might get wrong url for wrong input";
            copyMessage.classList.add("text-error");
            copyMessage.classList.remove("text-primary");
            copyMessage.classList.remove("d-hide");
          }
        })
        .catch((err) => {
          alert(err);
        });
    });
  } else {
    toastError.classList.remove("d-hide");
    setTimeout(() => {
      toastError.classList.add("d-hide");
    }, 1500);
  }
});
