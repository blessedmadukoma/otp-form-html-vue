const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button");

// iterate over all inputs
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    // get the current, next and previous input elements
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    // if value is morre than one, clear
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // if next input is disabled and current value is not empty, enable the next input
    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // if backspace is pressed, itereate over inputs again
    if (e.key === "Backspace") {
      inputs.forEach((input, index2) => {
        // set disabled attribute and focus on previous element if index1 of the current input is less than or equal to the index2 of the input in the outer loop
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          currentInput.value = "";
          prevInput.focus();
        }
      });
    }

    // add active class to button fourth element (index no 3) if it's not empty and has no disable attribute
    if (!inputs[3].disabled && inputs[3].value !== "") {
      button.classList.add("active");
      return;
    }

    button.classList.remove("active");
  });
});

//  focus the first input which index is 0 on window load
window.addEventListener("load", () => inputs[0].focus());
