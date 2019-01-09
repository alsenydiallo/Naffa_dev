$(document).ready(function(){

    $('form[id="donation_form"]').validate({
        rules: {
            first_name: 'required',
            last_name: 'required',
            user_email: {
                required: true,
                email: true
            }
        },
        messages: {
            first_name: 'This field is required',
            last_name: 'This field is required',
            user_email: 'Enter a valid email'
        },
        submitHandler: (function (e) {
            var data = $('form[id="donation_form"]').serialize();
            alert(data);
            e.submit();
        })

    });


});