function stringToHTMLNSFrag(strHTML) {
    var temp = document.createElementNS("http://www.w3.org/2000/svg", "template");
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


const createDonutChart = function(donutData) {
    console.log(donutData);
    //Create SVG for chart
    const svgContainer = document.getElementById("donut");
    let svgId = "donut-" + generateRandomString(3);

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "40%"); //50%
    svg.setAttribute("height", "300px");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.setAttribute("role", "img");
    svg.setAttribute("title", "Your total balance status")
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("aria-describedby", donutData.title);
    svg.setAttribute("id", svgId);

    //let figure = document.createElement("figure");
    //figure.style.width="45%";

    const donutHole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    donutHole.setAttribute("cx", "25");
    donutHole.setAttribute("cy", "25");
    donutHole.setAttribute("r", "15.91");
    donutHole.setAttribute("fill", "#FFF");
    donutHole.setAttribute("class", "donut-hole");
    //let donutHole = `<circle cx="50" cy="50" r="15.91" fill="#FFF" class="donut-hole"/></circle>`;
    //let donutRing = `<circle cx="50" cy="50" r="15.91" fill="transparent" stroke="#d2d3d4" class="donut-ring" stroke-width="3"/></circle>`;

    const donutRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    donutRing.setAttribute("cx", "25");
    donutRing.setAttribute("cy", "25");
    donutRing.setAttribute("r", "15.91");
    donutRing.setAttribute("fill", "transparent");
    donutRing.setAttribute("stroke", "#FFF"); //#d2d3d4
    donutRing.setAttribute("stroke-width", "3");
    donutRing.setAttribute("class", "donut-ring");


    svg.append(donutHole);
    svg.append(donutRing);

    //Creates all donut segments based on data
    [].forEach.call(donutData.data, function(el) {

        let percentage = parseInt((el.x * 100) / donutData.base);
        let difference = 100 - percentage;
        let ariaLabel = el.name + " " + el.x + " dollars"; // we can furtherly add another value to data if it's curency/points/other values

        let segment = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        segment.setAttribute("cx", "25");
        segment.setAttribute("cy", "25");
        segment.setAttribute("r", "15.91");
        segment.setAttribute("fill", "transparent");
        segment.setAttribute("stroke-dasharray", `${percentage} ${difference}`);
        segment.setAttribute("stroke", el.color);
        segment.setAttribute("stroke-width", "3");
        segment.setAttribute("class", "donut-segment");
        segment.setAttribute("tabindex", "0");
        segment.setAttribute("aria-label", ariaLabel); //TBI: To be Improved - at the moment it receives it from data but we want it to be provided by the annotations which needs to be populated first

        let segmentTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
        segmentTitle.innerHTML = el.name;
        let segmentDescription = document.createElementNS("http://www.w3.org/2000/svg", "desc");
        segmentDescription.innerHTML = el.x + " of " + donutData.base;

        segment.appendChild(segmentTitle);
        segment.appendChild(segmentDescription);

        //let newCircle = stringToHTMLFrag(segmentTemplate);

        svg.appendChild(segment);
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

    let legendNumber = `<text x="50%" y="50%" class="donut-number">${donutData.base}</text>`;
    let legendLabel = `<text x="50%" y="50%" class="donut-label">Total balance</text>`;

    let number = stringToHTMLNSFrag(legendNumber);
    let label = stringToHTMLNSFrag(legendLabel);

    // let legendNumber = document.createElementNS("http://www.w3.org/2000/svg", "text");
    // legendNumber.setAttribute("x", "50%");
    // legendNumber.setAttribute("y", "50%");
    // legendNumber.setAttribute("class", "donut-number");

    // let legendLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    // legendLabel.setAttribute("x", "50%");
    // legendLabel.setAttribute("y", "50%");
    // legendLabel.setAttribute("class", "donut-label");

    //legendNumber.innerHTML = donutData.base;
    //legendLabel.innerHTML = "Total Balance";

    //g.appendChild(legendNumber);
    // g.appendChild(legendLabel);

    g.appendChild(number);
    g.appendChild(label);

    svg.appendChild(g);
}



export {
    createDonutChart
}