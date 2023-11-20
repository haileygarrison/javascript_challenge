function createPannel(x) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let results = metadata.filter(y => y.id == x);
        let result = results[0];
        let PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        for(key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        };
    });
}   
function createCharts(x) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let results = samples.filter(y => y.id == x);
        let result = results[0];


        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 30}
        };
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        let yticks = otuIDs.slice(0, 10).map(otuIDs => `OTU ${otuIDs}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sampleValues.slice(0, 10).reverse(),
                text: otuLabels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        let barLayout = {
            titel: "Top 10 Barcteria Cultures Found",
            margin: { t: 30, l: 150}
        }

        Plotly.newPlot("bar", barData, barLayout)
    });
}
function optionChanged(x) {
    createPannel(x);
    createCharts(x);
}
function init() {
    let dropdown = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let names = data.names;
        for (let index = 0; index < names.length; index++) {
            dropdown.append("option").text(names[index]).property("value", names[index]);

        }
        createPannel(names[0]);
        createCharts(names[0]);

    });
}
init();