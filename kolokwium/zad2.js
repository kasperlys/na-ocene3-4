document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const skillLevelSelect = document.getElementById('skillLevel');
    const packageOptions = document.querySelectorAll('input[name="starterPackage"]');
    const baseFeeElement = document.getElementById('baseFee');
    const packageFeeElement = document.getElementById('packageFee');
    const totalFeeElement = document.getElementById('totalFee');
    const successMessage = document.getElementById('successMessage');

    // Słownik z kosztami pakietów
    const packagePrices = {
        basic: 0,
        standard: 15,
        premium: 30
    };

    // Słownik z kosztami poziomów
    const levelPrices = {
        beginner: 20,
        intermediate: 25,
        advanced: 30
    };

    // Obliczanie i aktualizacja kosztów
    function updateFees() {
        const selectedLevel = skillLevelSelect.value;
        const selectedPackage = document.querySelector('input[name="starterPackage"]:checked').value;
        
        let baseFee = 0;
        if (selectedLevel) {
            baseFee = levelPrices[selectedLevel];
        }
        
        const packageFee = packagePrices[selectedPackage];
        const totalFee = baseFee + packageFee;
        
        baseFeeElement.textContent = baseFee;
        packageFeeElement.textContent = packageFee;
        totalFeeElement.textContent = totalFee;
    }

    // Nasłuchiwanie zmian w formularzu
    skillLevelSelect.addEventListener('change', updateFees);
    
    packageOptions.forEach(option => {
        option.addEventListener('change', updateFees);
    });

    // Inicjalne obliczenie kosztów
    updateFees();

    // Walidacja i wysłanie formularza
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Walidacja wieku
        const ageInput = document.getElementById('age');
        const age = parseInt(ageInput.value);
        const ageError = document.getElementById('ageError');
        
        if (isNaN(age)) {
            ageError.textContent = 'Wiek musi być liczbą';
            return;
        } else if (age < 8 || age > 99) {
            ageError.textContent = 'Wiek musi być w przedziale 8-99 lat';
            return;
        } else {
            ageError.textContent = '';
        }
        
        // Walidacja emaila
        const emailInput = document.getElementById('email');
        const emailPattern = new RegExp(emailInput.pattern);
        const emailError = document.getElementById('emailError');
        
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Proszę podać poprawny adres e-mail';
            return;
        } else {
            emailError.textContent = '';
        }
        
        // Sprawdzenie akceptacji regulaminu
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('Proszę zaakceptować regulamin');
            return;
        }
        
        // Jeśli walidacja przebiegła pomyślnie
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Tutaj można dodać kod wysyłający dane na serwer
    });
});