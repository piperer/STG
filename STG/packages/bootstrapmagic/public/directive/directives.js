'use strict';

/* Directives */


angular.module('mean.bootstrapmagic').
  
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    // directive('colorPickerApply',[ function() {
    //     return {
    //         link: function(scope, element, attrs) {
                
    //             element.bind('change',  function () {
    //             	// if (scope.variable.value.charAt(0) == '#') {
    //              //        element.colorpicker('setValue', scope.variable.value);
    //              //    }
    //             	// clearTimeout(inputChange);
    //              //    inputChange = setTimeout(
    //              //        function () {
    //              //            scope.$apply(attrs.colorPickerApply);
    //              //        }, 400
    //              //    );
    //             });
                
    //         }
    //     };
    // }]).

    directive('scrollTop',[ function() {
        return {
           
            link: function(scope, element, attrs) {
                $('#scrollTop').hide();

                $(function(){
                    $(window).scroll(function(){
                       if ($(this).scrollTop() > 200){
                           $('#scrollTop').fadeIn();
                       }else{
                           $('#scrollTop').fadeOut();
                       }
                    });
                });

                 $('#scrollTop').click(function(){
                    $('body,html').animate({
                       scrollTop: 0
                    }, 300);
                    return false;
                 }); 
                    
            }
        };
    }])

    .directive('myDownload', function ($compile) {
        return {
            restrict:'E',
            scope:{ getUrlData:'&getData'},
            link:function (scope, elm, attrs) {
                var url = URL.createObjectURL(scope.getUrlData());
                elm.append($compile(
                    '<a class="btn btn-success" download="versions.json"' +
                        'href="' + url + '">' +
                        'Download' +
                        '</a>'
                )(scope));
            }
        };
    });

