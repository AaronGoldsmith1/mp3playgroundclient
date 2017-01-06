$(document).ready(function () {

  //represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode, need to create an AudioContext before you do anything else, as everything happens inside a context.
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  //tagert the audio source to be visualized
  var audioElement = document.getElementById('audioElement');

  // Create a MediaElementAudioSourceNode associated with an HTMLMediaElement. This can be used to play and manipulate audio from <video> or <audio> elements.
  var audioSrc = audioCtx.createMediaElementSource(audioElement);

  //Create an AnalyserNode, which can be used to expose audio time and frequency data and for example to create data visualisations.
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);

  //return an AudioDestinationNode representing the final destination of all audio in the context. It often represents an actual audio-rendering device such as your device's speakers.
  audioSrc.connect(audioCtx.destination);


  var frequencyData = new Uint8Array(200);

  //defining dimensions of visualizer
  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 0, ' + d + ')';
        });
  }

  // Run the loop
  renderChart();

});
