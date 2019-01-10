$(document).ready(function(){

    //****************************************************************** code refferenced from stipe example
    // https://stripe.com/docs/stripe-js
    // Create a Stripe client.
    var stripe = Stripe('pk_test_ip1Tprb7ZQnygnd29kbzAg8s');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card_element` <div>.
    card.mount('#card_element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card_errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    //****************************************************************** End of strip code


    $('form[id="payment-form"]').on('submit', function(e){
        e.preventDefault();

        $(".error").remove();

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#user_email').val();
        var zip_code = $('#zip_code').val();
        var card = $('#card_element').val();

        if(first_name.length < 1) {
            $('#first_name').before('<span class="error">This field is required</span>');
        }

        if(last_name.length < 1) {
            $('#last_name').before('<span class="error">This field is required</span>');
        }

        if(email.length < 1) {
            $('#user_email').before('<span class="error">This field is required</span>');
        } else {
            var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $('#email').before('<span class="error">Enter a valid email</span>');
            }
        }

        if(zip_code.length < 1){
            $('#zip_code').before('<span class="error">This field is required</span>')
        }else{
            var regEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
            var valid_zipCode = regEx.test(zip_code);
            if(!valid_zipCode){
                $('#zip_code').before('<span class="error">Enter a valide zip code</span>');
            }

        }
        if(card.length < 1){
        }


    });


});