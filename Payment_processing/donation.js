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


    $('form[id="payment-form"]').validate({
        rules: {
            first_name: 'required',
            last_name: 'required',
            zip_code: {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5
            },
            user_email: {
                required: true,
                email: true
            },
            card_element:{
                required: true,
                digits: true
            }
        },
        messages: {
            first_name: 'This field is required',
            last_name: 'This field is required',
            zip_code: 'Enter a valide zip code',
            card_element: 'Enter a valid card number',
            user_email: 'Enter a valid email'
        },
        submitHandler: (function (event) {
            var form = $('form[id="payment-form"]').serialize();
            var card =
            alert(form);
            event.submit();
        })

    });


});