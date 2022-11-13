const domSelector = "donut-chart";
const domSelectorInitialized = domSelector + '--initialized';


//Class
class Donut {
    constructor(el, index) {
        this.el = el;
        this.index = index || el.getAttribute('id') || Math.floor(Math.random() * Math.floor(10000));
        this.initialized = false;
        this.init(el);
    }


    init() {
        this.initialized = true;
        this.el.classList.add(domSelectorInitialized);
        this.el.setAttribute("id", `donut-chart--${generateRandomString(3)}`);

        this.renderDonut();
    }

}

function donutInit() {
    const elsNew = document.querySelectorAll('.' + domSelector + ':not(.' + domSelectorInitialized + ')');
    if (elsNew.length) {
        elsNew.forEach(function(el, index) {
            new Donut(el, index);
        });
    }
}

function stringToHTMLNSFrag(strHTML) {
    //var temp = document.createElementNS("http://www.w3.org/2000/svg", "template");
    var temp = document.createElement("template");
    temp.innerHTML = strHTML;
    return temp.content;
}


function generateRandomString(n) {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < n; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}


const renderDonut = function(options) {
    options = options || {};
    options.domScope = document;
    console.log(options);
    if (options) {
        let donutContainer = document.getElementById(options.container);
        let svgId = "donut-" + generateRandomString(3);

        let svgTemplate = `<svg width="40%" height="300px"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0  50 50"
        role="img" title="Your total balance status" aria-describedby="${donutData.title}" 
        id="${svgId}"></svg>`; //svgId needs to come from donut ID random generated id on donutInit-- WIP

        let newSVG = stringToHTMLNSFrag(svgTemplate); //stringToHTMLNSFrag(`<p><p>`);

        donutContainer.appendChild(newSVG);
    }
}

const createDonutChart = function(donutData) {
    //Create SVG for chart
    const svgContainer = document.getElementById("donut");
    let svgId = "donut-" + generateRandomString(3);


    //Need a FN that returns this template
    let svgTemplate = `<svg width="40%" height="300px"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0  50 50"
        role="img" title="Your total balance status" aria-describedby="${donutData.title}" 
        id="${svgId}"></svg>`; //svgId needs to come from donut ID random generated id on donutInit-- WIP

    let newSVG = stringToHTMLNSFrag(svgTemplate); //stringToHTMLNSFrag(`<p><p>`);

    svgContainer.appendChild(newSVG);


    const donutHole = `<circle cx="25" cy="25" r="15.91" fill="#FFF" class="donut-hole"/></circle>`;
    const donutRing = `<circle cx="25" cy="25" r="15.91" fill="transparent" stroke="#FFF" class="donut-ring" stroke-width="3"/></circle>`; //#d2d3d4

    let newDonutHole = stringToHTMLNSFrag(donutHole);
    let newDonutRing = stringToHTMLNSFrag(donutRing);


    svgContainer.insertBefore(newDonutHole, newSvg);
    svgContainer.insertBefore(newDonutRing, newSVG);

    //newSVG.append(newDonutHole);
    //newSvg.append(newDonutRing);

    //Creates all donut segments based on data
    [].forEach.call(donutData.data, function(el) {

        let percentage = parseInt((el.x * 100) / donutData.base);


        let difference = 100 - percentage;
        let ariaLabel = el.name + " " + el.x + " dollars"; // we can furtherly add another value to data if it's curency/points/other values

        let segmentTemplate = `<circle cx="25" cy="25" r="15.91" fill="transparent" stroke-dasharray="${percentage} ${difference}"
          stroke="${el.color}" stroke-width="3" class="donut-segment" tabindex="0" aria-label="${ariaLabel}">
          <title>${el.name}</title>
          <desc>${el.x} of ${donutData.base}</desc></circle>`;

        //svg.appendChild(segmentTemplate); //segment
    });


    //calculate strokeDashOffsets
    /*Circumference (100) - All preceding segments' total length + first segment offset*/
    let allSegments = svg.querySelectorAll(".donut-segment");

    var dashOffset = 0;

    [].forEach.call(allSegments, function(segment, index) {

        if (segment == allSegments[0]) {
            segment.setAttribute("stroke-dashoffset", "25");
            return;
        }
        if (segment != allSegments[0]) {

            /*----NEEDS IMPROVEMENT-----*/
            for (let i = 0; i < index; i++) {
                let segmentLength = allSegments[i].getAttribute("stroke-dasharray").slice(0, 2);
                let segmentLengthInt = parseInt(segmentLength);

                dashOffset = dashOffset + segmentLength;
            }
            dashOffset = 100 - dashOffset + 25;
            segment.setAttribute("stroke-dashoffset", dashOffset);
            dashOffset = 0;
            return;
        }
    });

    //append
    //figure.append(svg);
    svgContainer.append(svg);


    /*Create Donut Chart Vignettes*/
    //Needs ADA review

    let vignetteGroup = document.createElement("div"); //document.createElementNS("http://www.w3.org/2000/svg", "g");
    vignetteGroup.setAttribute("class", "donut-chart__vignette");
    vignetteGroup.setAttribute("style", "width: 60%;")

    svgContainer.appendChild(vignetteGroup);



    //an SVG for each vignette
    [].forEach.call(donutData.data, function(el) {
        let vignette = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        vignette.setAttribute("width", "100%");
        vignette.setAttribute("height", "50px");
        vignette.setAttribute("viewBox", "200 0 50 50");
        vignette.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        vignette.setAttribute("role", "img");
        vignette.setAttribute("title", el.name)
        vignette.setAttribute("class", "donut__vignette");


        let vignetteDonutHole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        vignetteDonutHole.setAttribute("cx", "25");
        vignetteDonutHole.setAttribute("cy", "25"); //needs to be 
        vignetteDonutHole.setAttribute("r", "5");
        vignetteDonutHole.setAttribute("fill", "#FFF");
        vignetteDonutHole.setAttribute("class", "donut-hole__vignette");
        vignetteDonutHole.setAttribute("aria-hidden", "hidden");



        let vignetteDonutRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        vignetteDonutRing.setAttribute("cx", "25");
        vignetteDonutRing.setAttribute("cy", "25");
        vignetteDonutRing.setAttribute("r", "15.91");
        vignetteDonutRing.setAttribute("fill", "transparent");
        vignetteDonutRing.setAttribute("stroke", "#d2d3d4"); //#d2d3d4
        vignetteDonutRing.setAttribute("stroke-width", "3");
        vignetteDonutRing.setAttribute("class", "donut-ring__vignette");

        vignette.append(vignetteDonutHole);
        vignette.append(vignetteDonutRing);


        let percentageVignette = parseInt((el.x * 100) / donutData.base);
        let differenceVignette = 100 - percentageVignette;

        let segmentVignette = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        segmentVignette.setAttribute("cx", "25");
        segmentVignette.setAttribute("cy", "25");
        segmentVignette.setAttribute("r", "15.91");
        segmentVignette.setAttribute("fill", "transparent");
        segmentVignette.setAttribute("stroke-dasharray", `${percentageVignette} ${differenceVignette}`);
        segmentVignette.setAttribute("stroke", el.color);
        segmentVignette.setAttribute("stroke-width", "3");
        segmentVignette.setAttribute("class", "donut-segment__vignette");



        let vignetteNumber = document.createElementNS("http://www.w3.org/2000/svg", "text");
        vignetteNumber.setAttribute("x", "60px");
        vignetteNumber.setAttribute("y", "50%");
        vignetteNumber.setAttribute("class", "donut-vignette-text");
        vignetteNumber.setAttribute("style", "font-size: 16px");
        vignetteNumber.innerHTML = el.name;

        vignette.appendChild(segmentVignette);
        vignette.appendChild(vignetteNumber);

        //svgContainer.appendChild(vignette);

        vignetteGroup.appendChild(vignette);

    });



    /*Create Legend at Center*/

    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "donut-legend");

    let legendNumber = document.createElementNS("http://www.w3.org/2000/svg", "text");
    legendNumber.setAttribute("x", "50%");
    legendNumber.setAttribute("y", "50%");
    legendNumber.setAttribute("class", "donut-number");

    let legendLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    legendLabel.setAttribute("x", "50%");
    legendLabel.setAttribute("y", "50%");
    legendLabel.setAttribute("class", "donut-label");

    legendNumber.innerHTML = donutData.base;
    legendLabel.innerHTML = "Total Balance";

    g.appendChild(legendNumber);
    g.appendChild(legendLabel);

    svg.appendChild(g);

}



export {
    createDonutChart,
    donutInit,
    Donut,
    renderDonut,
}