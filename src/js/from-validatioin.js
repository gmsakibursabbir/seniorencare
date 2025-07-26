const countries = [
  {
    name: 'United States',
    code: 'US',
    dial_code: '+1',
    example: '+1 202-555-0147',
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    dial_code: '+880',
    example: '+880 1711-223344',
  },
  { name: 'India', code: 'IN', dial_code: '+91', example: '+91 98765-43210' },
  {
    name: 'United Kingdom',
    code: 'GB',
    dial_code: '+44',
    example: '+44 7700 900123',
  },
  { name: 'Canada', code: 'CA', dial_code: '+1', example: '+1 416-123-4567' },
  { name: 'Mexico', code: 'MX', dial_code: '+52', example: '+52 55 1234 5678' },
  { name: 'Spain', code: 'ES', dial_code: '+34', example: '+34 612 345 678' },
  {
    name: 'Germany',
    code: 'DE',
    dial_code: '+49',
    example: '+49 1512 3456789',
  },
  {
    name: 'France',
    code: 'FR',
    dial_code: '+33',
    example: '+33 6 12 34 56 78',
  },
  {
    name: 'Australia',
    code: 'AU',
    dial_code: '+61',
    example: '+61 412 345 678',
  },
];

const countrySelect = document.getElementById('country');
const phoneInput = document.getElementById('phone');

// Inject countries into <select>
countries.forEach(country => {
  const opt = document.createElement('option');
  opt.value = country.code;
  opt.textContent = `${country.code}`;
  opt.dataset.code = country.dial_code;
  opt.dataset.example = country.example;
  if (country.code === 'US') opt.selected = true;
  countrySelect.appendChild(opt);
});

// Set initial placeholder
const defaultOption = countrySelect.options[countrySelect.selectedIndex];
phoneInput.placeholder = defaultOption.dataset.example;

// Update placeholder on change
countrySelect.addEventListener('change', function () {
  const selected = this.options[this.selectedIndex];
  phoneInput.placeholder = selected.dataset.example;
});

// Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  const fields = this.querySelectorAll(
    'input[required], textarea[required], select[required]'
  );
  fields.forEach(field => {
    const errorP = field.parentElement.querySelector('p');
    if (!field.value.trim()) {
      field.classList.add('border-red-500');
      if (errorP) errorP.classList.remove('hidden');
      isValid = false;
    } else {
      field.classList.remove('border-red-500');
      if (errorP) errorP.classList.add('hidden');
    }
  });

  const email = this.email.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    this.email.classList.add('border-red-500');
    this.email.nextElementSibling.classList.remove('hidden');
    isValid = false;
  }

  const phone = phoneInput.value.trim();
  if (!phone.startsWith('+') || phone.length < 8) {
    phoneInput.classList.add('border-red-500');
    document.getElementById('phoneError').classList.remove('hidden');
    isValid = false;
  } else {
    phoneInput.classList.remove('border-red-500');
    document.getElementById('phoneError').classList.add('hidden');
  }

  const privacy = document.getElementById('privacy');
  if (!privacy.checked) {
    document.getElementById('privacyError').classList.remove('hidden');
    isValid = false;
  } else {
    document.getElementById('privacyError').classList.add('hidden');
  }

  if (isValid) {
    alert('✅ Formulario enviado correctamente.');
    this.reset();
    // Reset placeholder after reset
    phoneInput.placeholder = defaultOption.dataset.example;
  }
});
