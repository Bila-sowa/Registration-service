const form = document.querySelector('Form');
form.addEventListener('submit', function(event) {
    event.preventDefault();   // ← главное
    // Здесь можно отправить данные через fetch/AJAX
    
    console.log('Форма отправлена без перезагрузки');
    
    // Пример отправки через fetch:
    // fetch('/api/submit', {
    //     method: 'POST',
    //     body: new FormData(form)
    // });
});