function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // get top 10 otu ids for plot OTU, reverse it 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // get otu ids to desired form for plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // get top 10 labels for plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create bar plot
        Plotly.newPlot("bar", data, layout);
            // bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set layout for bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // create data variable 
            var data1 = [trace1];
    
        // create bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // create function for data
    function getDemoInfo(id) {
    // read json file to get data
        d3.json("samples.json").then((data)=> {
    // get metadata for demographic data
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter metadata by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty demographic data before new info
           demographicInfo.html("");
    
         // grab demographic data for id, append data 
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create function for change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create function for data image
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get id data to dropdwown 
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call functions to display data and plots
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();