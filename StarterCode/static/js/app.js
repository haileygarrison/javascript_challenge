function createPannel(x) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let results = metadata.filter(y => y.id == x)
        let result = results[0]
    });
}
function createCharts(x) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let results = samples.filter(y => y.id == x)
        let result = results[0]

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