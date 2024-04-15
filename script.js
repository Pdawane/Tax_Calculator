document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tax-form');
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
      
      if (validateInput()) {
          // Proceed with calculation
          console.log("Form submitted successfully!");
          calculateTax(); // Call calculateTax function if all fields are filled
      } else {
          // Focus on the first input with an error (optional)
          const firstErrorInput = document.querySelector('.error-icon[style="inline-block"]');
          if (firstErrorInput) {
              firstErrorInput.previousElementSibling.focus(); // Focus on the input with the error
          }
      }
  });
});

function validateInput() {
  let isValid = true;

  // Check gross income
  const grossIncomeInput = document.getElementById('gross-income');
  if (!grossIncomeInput.value.trim()) {
      showError(grossIncomeInput, 'Please enter gross annual income');
      isValid = false;
  } else {
      hideError(grossIncomeInput);
  }

  // Check extra income
  const extraIncomeInput = document.getElementById('extra-income');
  if (!extraIncomeInput.value.trim()) {
      showError(extraIncomeInput, 'Please enter extra income');
      isValid = false;
  } else {
      hideError(extraIncomeInput);
  }

  // Check deductions
  const deductionsInput = document.getElementById('deductions');
  if (!deductionsInput.value.trim()) {
      showError(deductionsInput, 'Please enter deductions');
      isValid = false;
  } else {
      hideError(deductionsInput);
  }

  // Check age selection
  const ageSelect = document.getElementById('age');
  if (!ageSelect.value) {
      showError(ageSelect, 'Please select your age group');
      isValid = false;
  } else {
      hideError(ageSelect);
  }

  return isValid;
}

function showError(input, message) {
  const errorIcon = document.getElementById(input.id + '-error');
  errorIcon.style.display = 'inline-block';
  $(input).tooltip({ title: message, trigger: "hover" }).tooltip('show');
}

function hideError(input) {
  const errorIcon = document.getElementById(input.id + '-error');
  errorIcon.style.display = 'none';
  $(input).tooltip('hide');
}
// Function to show error icon and tooltip
function showError(input, message) {
  const errorIcon = input.nextElementSibling;
  errorIcon.style.display = 'inline-block';
  $(input).tooltip({title: message, trigger: "hover"}).tooltip('show');
}

// Function to hide error icon and tooltip
function hideError(input) {
  const errorIcon = input.nextElementSibling;
  errorIcon.style.display = 'none';
  $(input).tooltip('hide');
}

// Hide error icons initially
const errorIcons = document.querySelectorAll('.error-icon');
errorIcons.forEach(icon => {
  icon.style.display = 'none';
});

// Function to validate user input
function validateInput() {
  let isValid = true;

  // Check gross income
  const grossIncomeInput = document.getElementById('gross-income');
  if (!grossIncomeInput.value || isNaN(grossIncomeInput.value) || parseFloat(grossIncomeInput.value) < 0) {
    showError(grossIncomeInput, 'Gross annual income must be a positive number');
    isValid = false;
  } else {
    hideError(grossIncomeInput);
  }

  // Check extra income (if provided)
  const extraIncomeInput = document.getElementById('extra-income');
  if (extraIncomeInput.value && (isNaN(extraIncomeInput.value) || parseFloat(extraIncomeInput.value) < 0)) {
    showError(extraIncomeInput, 'Extra income must be a positive number');
    isValid = false;
  } else {
    hideError(extraIncomeInput);
  }

  // Check deductions (if provided)
  const deductionsInput = document.getElementById('deductions');
  if (deductionsInput.value && (isNaN(deductionsInput.value) || parseFloat(deductionsInput.value) < 0)) {
    showError(deductionsInput, 'Deductions must be a positive number');
    isValid = false;
  } else {
    hideError(deductionsInput);
  }

  // Check age selection
  const ageSelect = document.getElementById('age');
  if (!ageSelect.value) {
    showError(ageSelect, 'Please select your age group');
    isValid = false;
  } else {
    hideError(ageSelect);
  }

  return isValid;
}

// Event listener for form submission
const form = document.getElementById('tax-form');
const taxAmountElement = document.getElementById('tax-amount');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateInput()) {
    // Proceed with calculation
    const taxAmount = calculateTax();
    taxAmountElement.textContent = `Your tax amount is ₹ ${taxAmount}`;
    document.getElementById('result-modal').style.display = 'block';
  }
});

// Event listener for closing modal
const closeModalButton = document.getElementById('close-modal');
const resultModal = document.getElementById('result-modal');

// Add event listener to close modal button (for clarity)
closeModalButton.addEventListener('click', function() {
  resultModal.style.display = 'none';
});

// Add event listener to close modal when clicking on the result-modal itself (for cross sign)
resultModal.addEventListener('click', function(event) {
  // Check if the clicked element has the ID 'close-modal' (or the class you use for the cross sign)
  if (event.target.id === 'close-modal' || event.target.classList.contains('cross-sign-class')) { // Replace 'cross-sign-class' with your actual class name
    resultModal.style.display = 'none';
  }
});

// JavaScript to show and hide modal and overlay
document.getElementById('calculate-tax-button').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('result-modal').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('result-modal').style.display = 'none';
});
