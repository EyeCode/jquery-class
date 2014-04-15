(function($) {

    $.numberFormat = function(target, options) {

        var defaults = {
            prefix: '',
            suffix: '',
            digits: 2,
            digitSeparator: '.',
            rounding: true
        }, settings, result,eNumber, nNumber, dNumber;


        settings = $.extend({}, true, defaults, options);

        target = target.toString();

        eNumber = target.split(settings.digitSeparator);

        nNumber = eNumber[0];

        dNumber = !isNaN(eNumber[1]) ? eNumber[1] : "0";

        if (settings.rounding === true) {
            coef = 1;
            for(var i = 0; i < settings.digits; i++) {
                coef = coef * 10;
            }

            var newDigits = Math.round(parseFloat(target)*coef)/coef;

            newDigits = newDigits.toString();
            exploding = newDigits.split(settings.digitSeparator);

            dNumber = !isNaN(exploding[1]) ? exploding[1] : "0";
        }

        while (dNumber.length > settings.digits) {
            dNumber = dNumber.substring(0, dNumber.length - 1);
        }

        while (dNumber.length < settings.digits) {
            dNumber += "0";
        }

        if (settings.digits < 1) {
            settings.digitSeparator = '';
        }

        return settings.prefix + nNumber + settings.digitSeparator + dNumber + settings.suffix;
    };

})(jQuery);