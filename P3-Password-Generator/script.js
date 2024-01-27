const passwordInput = document.getElementById("generated-pass");
const copyIcon = document.querySelector(".copy");
const lengthSlider = document.getElementById("pass-length");
const options = document.querySelectorAll(".pass-settings input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
  const check = Array.from(options).filter((option) => option.checked);
  console.log(check);
  if (!check.length == 0) {
    options.forEach((option) => {
      if (option.checked) {
        if (
          option.id !== "exclude-duplicate" &&
          option.id !== "include-spaces"
        ) {
          staticPassword += characters[option.id];
        } else if (option.id === "include-spaces") {
          staticPassword += `  ${staticPassword}  `;
        } else {
          excludeDuplicate = true;
        }
      }
    });

    for (let i = 0; i < passLength; i++) {
      let randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if (excludeDuplicate) {
        !randomPassword.includes(randomChar) || randomChar == " "
          ? (randomPassword += randomChar)
          : i--;
      } else {
        randomPassword += randomChar;
      }
    }
    passwordInput.value = randomPassword;
  } else passwordInput.value=''
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = async () => {
  try {
    await navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
      copyIcon.innerHTML = '<i class="fa-regular fa-copy"></i>';
      copyIcon.style.color = "#707070";
    }, 1500);
  } catch (err) {
    console.error("Unable to copy to clipboard.", err);
  }
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
