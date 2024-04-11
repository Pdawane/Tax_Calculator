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











    document.addEventListener('DOMContentLoaded', function() {
      const tooltip = document.querySelector('.tooltip');
      const message = document.querySelector('.message');

      tooltip.addEventListener('click', function() {
        message.classList.toggle('hidden');
        if (!message.classList.contains('hidden')) {
          message.style.display = 'block';
          message.textContent = "Gross annual income is your total salary in a year before any deductions.";
        } else {
          message.style.display = 'none';
        }
      });
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

// Function to calculate tax
function calculateTax() {
  const grossIncome = parseFloat(document.getElementById('gross-income').value);
  const extraIncome = document.getElementById('extra-income').value ? parseFloat(document.getElementById('extra-income').value) : 0;
  const deductions = document.getElementById('deductions').value ? parseFloat(document.getElementById('deductions').value) : 0;
  const totalIncome = grossIncome + extraIncome - deductions;

  let tax = 0;

  if (totalIncome <= 800000) {
    tax = 0;
  } else {
    const age = document.getElementById('age').value;
    if (age === '<40') {
      tax = (totalIncome - 800000) * 0.3;
    } else if (age === '>=40 & <60') {
      tax = (totalIncome - 800000) * 0.4;
    } else {
      tax = (totalIncome - 800000) * 0.1;
    }
  }

  return tax.toFixed(2);
}

// Event listener for form submission
const form = document.getElementById('tax-form');
const taxAmountElement = document.getElementById('tax-amount');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateInput()) {
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
