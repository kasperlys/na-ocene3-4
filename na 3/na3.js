// Nasłuchiwanie zdarzenia submit formularza
document.getElementById('order-form').addEventListener('submit', function(event) {
    // Zapobieganie domyślnej akcji formularza
    event.preventDefault();
    
    // Resetowanie wszystkich komunikatów o błędach
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Flaga walidacji
    let isValid = true;
    
    // Walidacja wyboru bukie
    const bouquetSelected = document.querySelector('input[name="TYPE-POZIOM"]:checked');
    if (!bouquetSelected) {
        document.getElementById('poziom-error').textContent = 'prosze wybrac poziom zaawansowania';
        isValid = false;
    }
    
    // Walidacja ilości
    const quantity = document.getElementById('quantity').value;
    if (!quantity || quantity < 1) {
        document.getElementById('quantity-error').textContent = 'Proszę podać poprawną ilość';
        isValid = false;
    }
    
    // Walidacja imienia
    const firstName = document.getElementById('first-name').value;
    if (!firstName.trim()) {
        document.getElementById('first-name-error').textContent = 'Proszę podać imię';
        isValid = false;
    }
    
    // Walidacja nazwiska
    const lastName = document.getElementById('last-name').value;
    if (!lastName.trim()) {
        document.getElementById('last-name-error').textContent = 'Proszę podać nazwisko';
        isValid = false;
    }
    
    // Walidacja telefonu
    const phone = document.getElementById('wiek').value;
    if (!phone.trim()) {
        document.getElementById('wiek-error').textContent = 'Proszę podać wiek';
        isValid = false;
    }
    
    // Walidacja emaila
    const email = document.getElementById('email').value;
    if (!email.trim()) {
        document.getElementById('email-error').textContent = 'Proszę podać adres email';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('email-error').textContent = 'Proszę podać poprawny adres email';
        isValid = false;
    }
    
    // Jeśli formularz jest poprawny
    if (isValid) {
        // Wyświetlenie komunikatu i reset formularza
        alert('Zamówienie zostało złożone! Dziękujemy za zakupy w naszej kwiaciarni.');
        this.reset();
    }
});

// Funkcja walidująca format emaila
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}