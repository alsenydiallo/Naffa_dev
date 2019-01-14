$(document).ready(function(){

    //******************** creat card element **************************
    // https://stripe.com/docs/stripe-js
    // Create a Stripe client.
    var stripe = Stripe('pk_test_PHFmHnlx8XQASMab8s9o5laq');
    // Create an instance of Elements.
    var elements = stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
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
            displayError.setAttribute('class', 'error');
            displayError.textContent = event.error.message;
            //document.getElementById('button').hidden = true;
            //$('#button').prop('disabled',true);
        } else {
            displayError.textContent = '';
            //document.getElementById('button').hidden = false;
            //$('#button').prop('disabled',false);
        }
    });

    //************************ End of card code *****************************
    var el_amount = document.getElementById('amount');
    el_amount.addEventListener('change', function (ev) {
        $(".error").remove();
        var amount = $('#amount').val();
        if(amount < 5) {
            $('#amount').before('<span class="error">Amount must be $5 or more</span>');
        }
    })
    //************************ Create disclaimer element *****************************
    // Creates a text area element and insert the disclaimer
    var el_disclaimer = document.createElement("TEXTAREA");
    var disclaimer_msg = document.createTextNode('Stripe validates card information when it is saved. As a result of this process, customers may see a temporary authorization for $1 on their statement. This does not guarantee that any future charges succeed (e.g., the card no longer has sufficient funds, is reported lost or stolen, or if the account is closed). This process also includes the results of any checks, including traditional bank checks by Radar (e.g., CVC or ZIP code), that may have been performed.');

    el_disclaimer.appendChild(disclaimer_msg);
    $('#disclaimer').after(el_disclaimer);
    el_disclaimer.setAttribute('readonly', 'readonly');

    //************************ end of disclaimer element *****************************
    // on form submit, validate user data and submit to stripe payment for processing

    $('form[id="payment-form"]').on('submit', function(e){
        e.preventDefault();

        $(".error").remove();

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#user_email').val();
        var card = $('#card_element').val();
        var amount = $('#amount').val();
        var checkbox = $('#agree');


        if(first_name.length < 1) {
            $('#first_name').before('<span class="error">This field is required</span>');
            return false;
        }

        if(last_name.length < 1) {
            $('#last_name').before('<span class="error">This field is required</span>');
            return false;
        }

        if(email.length < 1) {
            $('#user_email').before('<span class="error">This field is required</span>');
            return false;
        }

        if(amount.length < 1){
            $('#amount').before('<span class="error">Amount must be $5 or more</span>');
            return false;
        }

        if(checkbox.prop("checked") == false){
            alert("must check the disclaimer box");
            return false;
        }


        var stripe = Stripe('pk_test_PHFmHnlx8XQASMab8s9o5laq');
        var elements = stripe.elements();

        stripe.createToken(card).then(function (result) {
            alert(result.token);
            if(result.error){
                alert(result.error);
            }else{
                alert("successfull");
                // Insert the token ID into the form so it gets submitted to the server
                // var form = document.getElementById('payment-form');
                // var hiddenInput = document.createElement('input');
                // //hiddenInput.setAttribute('type', 'hidden');
                // hiddenInput.setAttribute('name', 'stripeToken');
                // hiddenInput.setAttribute('value', token.id);
                // form.appendChild(hiddenInput);
                //
                // alert(hiddenInput.innerText);
            }
        });

    });


});