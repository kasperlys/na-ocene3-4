document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const skillLevelSelect = document.getElementById('skillLevel');
    const feeDisplay = document.getElementById('feeDisplay');
    const successMessage = document.getElementById('successMessage');

    // Calculate fee based on skill level
    skillLevelSelect.addEventListener('change', function() {
        const skillLevel = this.value;
        let fee = 20; // default fee
        
        if (skillLevel === 'intermediate') {
            fee = 25;
        } else if (skillLevel === 'advanced') {
            fee = 30;
        }
        
        feeDisplay.textContent = `Wpisowe: ${fee} PLN`;
    });

    //Calculate fea based on dls
    pakiet_startowySelect.addEventListener('change', function(){
        const pakiet_startowy = this.value;
        let fee = 20

        if(pakiet_startowy === 'standardowy') {
            fee = 30;
        }
        if (pakiet_startowy === 'standart+'){
            fee = 40
        }
        if (pakiet_startowy === 'dls') {
            fee = 50
        }

        
    })

    // Form submission handling
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate age
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
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailPattern = new RegExp(emailInput.pattern);
        const emailError = document.getElementById('emailError');
        
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Proszę podać poprawny adres e-mail';
            return;
        } else {
            emailError.textContent = '';
        }
        
        // Check terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('Proszę zaakceptować regulamin');
            return;
        }
        
        // If all validations pass, show success message
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Here you would typically send the data to a server
        // For this example, we'll just show the success message
    });
});