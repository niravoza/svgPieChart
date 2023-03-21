/**
 * Generate Svg pie chart using generatePiChart function
 * @author Nirav Oza
 * Date: 21-03-2023
 */

/**
 * @param selector
 * @param options
 */
var generatePieChart = function(selector,options){

    // Default configuration.
    var opt = {
        area: 400,
        data: []
    };

    // Merege default and passed configuration data.
    opt = Object.assign(opt, options);

    // Create SVG element node.
    createElementFunc = function(tag){
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }

    var wrapperEl = document.getElementById(selector);
    var svgEl = createElementFunc('svg');

    svgEl.setAttribute('width', opt.area);
    svgEl.setAttribute('height', opt.area);

    var rotate = 0;
    var oldItemValue = 0;
    opt.data.forEach(item => {
        var circleEl = createElementFunc('circle');
        var strokeWidth = 60;
        var xPosition = yPosition = opt.area/2;
        var radius = (opt.area/2) - (strokeWidth/2);
        var strokDashArray = Math.PI * 2 * radius;
        var strokeDashOffset = strokDashArray - ( (item.value * strokDashArray) / 100 );


        circleEl.setAttribute('class', 'circle-'+item.name);
        circleEl.setAttribute('cx', xPosition);
        circleEl.setAttribute('cy', yPosition);
        circleEl.setAttribute('r', radius);
        circleEl.setAttribute('stroke-width', strokeWidth);
        circleEl.setAttribute('stroke', item.color);
        circleEl.setAttribute('stroke-dasharray', strokDashArray);
        circleEl.setAttribute('stroke-dashoffset', strokeDashOffset);
        circleEl.setAttribute('transform-origin', xPosition+'px '+ yPosition+'px')
        circleEl.setAttribute('transform', 'rotate('+rotate+')');

        rotate = (360 * (item.value + oldItemValue)) / 100;
        oldItemValue = item.value
        svgEl.appendChild(circleEl);
    });

    wrapperEl.appendChild(svgEl);
}

// DATA JSON
var params = {
    data: [
        {name:'testOne',value:20, color:'#ee9abf'},
        {name:'testTwo',value:30, color:'#8a275d'},
        {name:'testThree',value:50, color:'#003a9b'},
    ]
}

new generatePieChart('wrapperContainer',params);