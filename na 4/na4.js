document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('order-form');
    const bouquetPrices = {
        'różowy różany': 120,
        'biały lilak': 90,
        'bordowe chryzantemy': 80
    };

    // Funkcje walidacji
    function validateForm() {
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Walidacja bukietu
        if (!document.querySelector('input[name="bouquet-type"]:checked')) {
            document.getElementById('bouquet-error').textContent = 'Proszę wybrać rodzaj bukietu';
            isValid = false;
        }

        // Walidacja ilości
        const quantity = document.getElementById('quantity').value;
        if (!quantity || quantity < 1) {
            document.getElementById('quantity-error').textContent = 'Proszę podać poprawną ilość';
            isValid = false;
        }

        // Walidacja danych kontaktowych
        const fields = [
            { id: 'first-name', errorId: 'first-name-error', message: 'Proszę podać imię' },
            { id: 'last-name', errorId: 'last-name-error', message: 'Proszę podać nazwisko' },
            { id: 'phone', errorId: 'phone-error', message: 'Proszę podać numer telefonu' },
            { id: 'email', errorId: 'email-error', message: 'Proszę podać adres email' }
        ];

        fields.forEach(field => {
            const value = document.getElementById(field.id).value.trim();
            if (!value) {
                document.getElementById(field.errorId).textContent = field.message;
                isValid = false;
            } else if (field.id === 'email' && !validateEmail(value)) {
                document.getElementById('email-error').textContent = 'Proszę podać poprawny adres email';
                isValid = false;
            }
        });

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Funkcje obliczeniowe (dla 4.0)
    function calculateTotal() {
        const selectedBouquet = document.querySelector('input[name="bouquet-type"]:checked');
        const quantity = parseInt(document.getElementById('quantity').value) || 0;
        
        let bouquetName = '-';
        let bouquetTotal = 0;
        
        if (selectedBouquet) {
            bouquetName = selectedBouquet.value;
            bouquetTotal = bouquetPrices[selectedBouquet.value] * quantity;
        }

        // Dodatkowe usługi
        const services = [];
        let servicesTotal = 0;
        
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(service => {
            const serviceName = service.nextElementSibling.textContent.replace(/\(\+\d+ zł\)/, '').trim();
            const servicePrice = parseInt(service.dataset.price);
            services.push(serviceName);
            servicesTotal += servicePrice;
        });

        // Aktualizacja podsumowania
        document.getElementById('summary-products').textContent = 
            selectedBouquet ? `${quantity}x ${bouquetName} (${bouquetTotal} zł)` : '-';
        
        document.getElementById('summary-services').textContent = 
            services.length > 0 ? `${services.join(', ')} (${servicesTotal} zł)` : '-';
        
        const total = bouquetTotal + servicesTotal;
        document.getElementById('summary-total').textContent = `${total} zł`;
    }

    // Nasłuchiwanie zdarzeń
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Zamówienie zostało złożone! Dziękujemy za zakupy w naszej kwiaciarni.');
            form.reset();
            calculateTotal(); // Resetuje podsumowanie
        }
    });

    // Dynamiczne obliczanie (dla 4.0)
    form.addEventListener('change', calculateTotal);
    form.addEventListener('input', calculateTotal);

    // Inicjalizacja podsumowania
    calculateTotal();
});