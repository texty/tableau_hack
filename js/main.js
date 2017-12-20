
$(document).ready(function() {

    $.get('template.txt', function(template) {
        console.log('template ready');

        $('#input').on('input change keyup', function() {

            try {
                var input = $('#input').val();

                var params = {};

                params.width = input.match(/vizElement\.style\.width='(\d+)px'/)[1];
                params.height = input.match(/vizElement\.style\.height='(\d+)px'/)[1];

                var noscript = $(input).find('noscript').text();
                params.img_alt = $(noscript).find('img').attr('alt');

                params.img_1_src = noscript.match(/src='([^']+)'/)[1];
                try {
                    params.dashboard_src = he.decode(input.match(/<param name='name'\s+value='([^']+)' \/>/)[1]);
                } catch (err) {
                    console.log("warn: error while finding dashboard_src");
                    console.log(err);
                }
                
                var output = template;
                Object.keys(params).forEach(function(key) {
                    var val = params[key];

                    output = output.replace(new RegExp('{{' + key + '}}', 'g'), val.toString())
                });

                $('#output').text(output);
            } catch (err) {
                $('#output').text('Error');
                console.log(err);
            }
        });

        $('#input').trigger('change');
    });
});
