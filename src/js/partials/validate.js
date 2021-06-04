document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-form')) {
        new JustValidate('.js-form', {
            rules: {
              checkbox: {
                required: true
              },
              email: {
                required: true,
                email: true
              },
              name: {
                required: true,
                minLength: 2
            },
            messages: {
              name: {
                minLength: 'My custom message about only minLength rule'
              },
              email: 'My custom message about error (one error message for all rules)'
            },  
            },
        })
    }
})
