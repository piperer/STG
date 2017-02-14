'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('mean.bootstrapmagic').
 // value('version', '0.2').
  factory('ap_less',['$http', function($http) {
  
    var lessEngine = {};
    
    lessEngine.importVariables = function ($scope, string) {
        var regex = {
            variable: /^\s*([^:]*)\s*:\s*([^\\;]*)/,
            emptyLine: /(^\s*$)/,
            comment: /(^\s*\/\/.*[^\r\n]*)/,
            commentMulti: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//
        };
        
        var parse = function (data){
            if(regex.commentMulti.test(data)){
                data = data.replace(regex.commentMulti,'');
            }
            var variables = [];
            var lines = data.split(/\r\n|\r|\n/);
            lines.forEach( 
                function(line){
                    if(regex.comment.test(line)){
                        return;
                    }else if(regex.emptyLine.test(line)){
                        return;
                    } else if(regex.variable.test(line)){
                        var match = line.match(regex.variable);
                        variables[match[1]] = match[2];
                    };
                }
            );
            return variables;
        };
        
        var vars = parse(string);
        for (var i = 0; i < $scope.variables.length; i++ ) {
    		for (var j = 0; j < $scope.variables[i].data.length; j++ ) {
    		    if (vars[$scope.variables[i].data[j].key]) {
                    $scope.variables[i].data[j].value = vars[$scope.variables[i].data[j].key];
                    delete vars[$scope.variables[i].data[j].key];
                }
            }
    	}
    	
    	var myVars = {
    	    name: 'My Variables',
    	    data: []
    	};
    	
    	for (var key in vars) {
    	    var type = 'text';
    	    if (key.toLowerCase().indexOf('color')) {
    	        type = 'color';
    	    }
    	    if (key.toLowerCase().indexOf('fontfamily')) {
    	        type = 'font';
    	    }
    	    var myVar = {
    	        key: key,
    	        value: vars[key],
    	        type: type
    	    };
    	    myVars.data.push(myVar);
    	    
    	}
    	$scope.variables.push(myVars);
        return $scope;
    }
    
    lessEngine.getVariables = function ($scope, all) {
    	var variables = {};
        var fonts = [];
    	for (var i = 0; i < $scope.variables.length; i++ ) {
            
            if (all == false && $scope.variables[i].name == "Private") {
                $scope.variables.splice(i,1);
            }else{
                for (var j = 0; j < $scope.variables[i].data.length; j++ ) {
                    // if type =  font, push it to an array 
                    if ($scope.variables[i].data[j].type == "font") {
                        fonts.push($scope.variables[i].data[j].value);
                    };
                    variables[$scope.variables[i].data[j].key] = $scope.variables[i].data[j].value;
                }   
            }
                        
    	}
        return{
            variables: variables,
            fonts: fonts
        }
    };
    
    /* var => array of variables */
    lessEngine.setVariables = function ($scope, vars) {
    	for (var i = 0; i < $scope.variables.length; i++ ) {
    		for (var j = 0; j < $scope.variables[i].data.length; j++ ) {
                $scope.variables[i].data[j].value = vars[$scope.variables[i].data[j].key];
            }
    	}
        return $scope;
    };
    
    lessEngine.getKeys = function ($scope) {
    
    	var keys = [
            'escape(@string)',
            'percentage(@number)',
            'rgb(@r, @g, @b)',
            'rgba(@r, @g, @b, @a)',
            'hsl(@hue, @saturation, @lightness)',
            'hsla(@hue, @saturation, @lightness, @alpha)',
            'hsv(@hue, @saturation, @value)',
            'hsva(@hue, @saturation, @value, @alpha)',
            'saturate(@color, 10%)',
            'desaturate(@color, 10%)',            
            'lighten(@color, 10%)',
            'darken(@color, 10%)',
            'fadein(@color, 10%)',
            'fadeout(@color, 10%)',
            'fade(@color, 50%)',
            'spin(@color, 10)',
            'mix(@color1, @color2, [@weight: 50%])',
            'greyscale(@color)',
            'contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%])',
            'multiply(@color1, @color2)',
            'screen(@color1, @color2)',            
            'overlay(@color1, @color2)',
            'softlight(@color1, @color2)',
            'hardlight(@color1, @color2)',
            'difference(@color1, @color2)',
            'exclusion(@color1, @color2)',
            'average(@color1, @color2)',
            'negation(@color1, @color2)',
            'ceil(@number)',                
            'floor(@number)',               
            'percentage(@number)',

    	];
    	
        for (var i = 0; i < $scope.variables.length; i++ ) {
            for (var j = 0; j < $scope.variables[i].data.length; j++ ) {
                keys.push($scope.variables[i].data[j].key);
            }
        }
    
        return keys;
    };
    
    lessEngine.getUrls = function ($scope) {
    	var keys = [
    	    "'/bootstrapmagic/assets/twitter-bootstrap/img/glyphicons-halflings.png'",
            "'/bootstrapmagic/assets/twitter-bootstrap/img/glyphicons-halflings-white.png'",
            "'/bootstrapmagic/assets/twitter-bootstrap/img/ap_icons_black_interface-orientation.png'",
            "'/bootstrapmagic/assets/twitter-bootstrap/img/ap_icons_white_interface-orientation.png'"
    	];
    	return keys;
    };
    
    lessEngine.getFonts = function ($scope) {
    	var keys = [];

        $.ajax({
            url: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBb_pLbXGeesG8wE32FMtywG4Vsfq6Uk_8",
            type: 'GET',
            dataType: 'JSONP',
            success: function (data) {
                
                for (var i = 0; i < data.items.length; i++ ) {
                    keys.push(data.items[i].family);
                }
            }
        });

    	return keys;
    };
    lessEngine.getFontVariants = function($scope, fonts){
      
       var  fontWeights = [];
       var googleFontFamilies = [];
        $.ajax({
            url: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBb_pLbXGeesG8wE32FMtywG4Vsfq6Uk_8",
            type: 'GET',
            dataType: 'JSONP',
            success: function (data) {
              for (var k = 0; k < fonts.length; k++ ) {    
              for (var i = 0; i < data.items.length; i++ ) {
                   if(data.items[i].family === fonts[k])
                   {  
                       // for the google font families
                       var variants = data.items[i].variants.toString();
                       var fontData =  data.items[i].family.replace(/ /g,"+")+':'+variants+':latin';   
                       if (googleFontFamilies.indexOf(fontData) == -1)
                            googleFontFamilies.push(fontData);
                       
                       for(var j = 0; j < data.items[i].variants.length; j++ )
                       {
                           if(data.items[i].variants[j].match(/\d+/g))  
                           {
                              // is just a regular number
                              if(!isNaN(parseFloat(data.items[i].variants[j])) && isFinite(data.items[i].variants[j]))
                              {
                               //create the regular array
                               if (typeof fontWeights[k] === 'undefined') 
                               {   
                                   fontWeights[k] = [];
                                   
                                }   
                                   if (typeof fontWeights[k]['regular'] === 'undefined') 
                                    {
                                            
                                            fontWeights[k]['regular'] = [];
                                     }
                                 
                               fontWeights[k]['regular'].push(data.items[i].variants[j]);
                              
                              }
                              else
                              {
                                
                                    var weight = data.items[i].variants[j].replace(/[^0-9]+/ig,"");
                                    var style =  data.items[i].variants[j].replace(/[0-9]+/ig,"");
                                   //create the regular array
                               if (typeof fontWeights[k] === 'undefined') 
                               {   
                                   fontWeights[k] = [];
                               }
                                   
                                    if (typeof fontWeights[k][style] === 'undefined') 
                                    {
                                           
                                            fontWeights[k][style] = [];
                                    }
                                
                                   
                                        fontWeights[k][style].push(weight);
                              }
                           }
                           else
                            {
                                 //create the regular array
                               if (typeof fontWeights[k] === 'undefined') 
                               {   
                                   fontWeights[k] = [];
                               }   
                                if (typeof fontWeights[k][data.items[i].variants[j]] === 'undefined') 
                                {
                                      //  fontWeights[k] = [];
                                        fontWeights[k][data.items[i].variants[j]] = [];
                                }
                             
                                fontWeights[k][data.items[i].variants[j]].push('400');
                             }
                       }
                       
                    
                    
                   }
                }
             
                 
            }  
                $scope.$apply(function(){
                  $scope.fontStylesWeights = fontWeights;
                  $scope.googleFontFamilies = googleFontFamilies;
                  // console.log($scope.googleFontFamilies)

                 //  console.log($scope.fontStylesWeights)
                });
      
            }
        });
        
          
    };
    
    lessEngine.getVariablesToString = function ($scope) {
    	var string = "" +
    	"/*\n"+
    	"* pikock http://www.pikock.com/ , autreplanete http://www.autreplanete.com/ \n"+
    	"*  \n"+
    	"**/\n";
        for (var i = 0; i < $scope.variables.length; i++ ) {
            string += '\n\n// ' + $scope.variables[i].name + "\n"
            for (var j = 0; j < $scope.variables[i].data.length; j++ ) {
                string += $scope.variables[i].data[j].key+': '+$scope.variables[i].data[j].value+";\n";
            }
        }
        return string;
    };
    
    lessEngine.saveLessVar = function(data){
        var $form = $('<form>').attr('method', 'POST').attr('action', 'http://bootstrapmagics-pikock.dotcloud.com/').append(
                $('<input>')
                    .attr('type', 'hidden')
                    .attr('name', 'data')
                    .attr('value', data)
            ).
            append(
                $('<input>')
                    .attr('type', 'hidden')
                    .attr('name', 'type')
                    .attr('value', 'less')
            );
        $('body').append($form);
        $form.submit();
    };
    
    lessEngine.saveCSS = function($scope){ console.log('save css called');
    	var parser = new(less.Parser)({
            paths: ['bootstrapmagic/assets/twitter-bootstrap/less/'], // Specify search paths for @import directives
            filename: 'bootstrap.less' // Specify a filename, for better error messages
        });
        $(document).load($('#twitterBootstrapLess').attr('href'), function (data) {
        	var vars = lessEngine.getVariables($scope).variables;
            for (name in vars) {
                data += ((name.slice(0,1) === '@')? '' : '@') + name +': '+ 
                        ((vars[name].slice(-1) === ';')? vars[name] : vars[name] +';');
            }
            console.log(vars)
        	parser.parse(data, function (err, tree) {
        	    if (err) { return console.error(err) }
        	    var type = ($scope.minified) ? 'mincss' : 'css';
                var css = tree.toCSS({ compress: $scope.minified });

                var customcss = css.split('~');

                console.log(customcss[1]);

                //console.log(customcss[1].length);

                //console.log("Ranga Called");

                var $form = $('<form>').attr('method', 'POST').attr('action', 'http://bootstrapmagics-pikock.dotcloud.com/').
                    append(
                        $('<input>')
                            .attr('type', 'hidden')
                            .attr('name', 'data')
                            .attr('value', customcss[1])
                    ).
                    append(
                        $('<input>')
                            .attr('type', 'hidden')
                            .attr('name', 'type')
                            .attr('value', type)
                    );
                $('body').append($form);
                $form.submit();
            });
        });
    };


        lessEngine.getCSS = function($scope){ console.log('get css called');

            var cssString = '';
            var url = $('#twitterBootstrapLess').attr('href');
            var parser = new(less.Parser)({
                paths: ['bootstrapmagic/assets/twitter-bootstrap/less/'], // Specify search paths for @import directives
                filename: 'bootstrap.less' // Specify a filename, for better error messages
            });

            jQuery.ajax({
                'url':url,
                'type':'GET',
                'async':false,

                'success':function(data){
                    var vars = lessEngine.getVariables($scope).variables;
                    for (name in vars) {
                        data += ((name.slice(0,1) === '@')? '' : '@') + name +': '+
                            ((vars[name].slice(-1) === ';')? vars[name] : vars[name] +';');
                    }

                    parser.parse(data, function (err, tree) {
                        if (err) { return console.error(err) }
                        var type = ($scope.minified) ? 'mincss' : 'css';
                        var css = tree.toCSS({ compress: $scope.minified });

                        var customcss = css.split('~');
                        cssString = customcss[1]
                      //  console.log(cssString);

                    });
                }
            });

            return cssString;
        }





    return lessEngine;
}]);
