$(function() {

    var jsonData;

    // resets file input

    $('#file-input').click(function() {
        this.value = "";
    });

    function readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            jsonData = JSON.parse(e.target.result);

            console.log(jsonData);
            updateSnapshot();
            // displayContents(jsonData);
        };
        reader.readAsText(file);
    }

    // function displayContents(contents) {
    //     var element = document.getElementById('file-content');
    //     element.innerHTML = contents;
    // }

    document.getElementById('file-input')
        .addEventListener('change', readSingleFile, false);


    // $.getJSON(jsonFile, function(data) {
    //     jsonData = data;
    //
    // });

    function updateSnapshot() {
        //title
        $('#advertiser').text(jsonData['advertiser-name']);
        $('#placement').text(jsonData['placement-name']);
        $('#title').css('background-image', "url(" + jsonData['agency-logo'] + ")");
        //format logo
        var formatClass = makeClassName(jsonData['format']);
        $('#format').attr('class', formatClass);
        $('#format use').attr('xlink:href', 'img/format-logos.svg#' + formatClass)

        //sites

        var sites = jsonData['sites'];
        var siteList = $('<ul/>');
        $.each(sites, function(i) {
            var li = $('<li>' + sites[i] + '</li>').appendTo(siteList);
        });
        $('#sites').html(siteList);
        //set metrics
        setMetric('hero-metric');
        setMetric('metric2');
        setMetric('metric3');

        // set impressions and clicks
        $('#impressions .value').text(jsonData['impressions-value']);
        $('#clicks .value').text(jsonData['clicks-value']);

        // icon color

        $('.icon svg').css('fill', jsonData['icon-color']);

        // iframe preview

        $('iframe').attr('src', ('http://create.playground.xyz/' + jsonData['creative-id']));

    };

    function setMetric(targetMetric) {
        var metricName = jsonData[targetMetric];
        var metricValue = jsonData[targetMetric + '-value'];
        var metricClass = makeClassName(metricName);
        var metricComparison = jsonData[targetMetric + '-comparison'];
        var metricTrending = jsonData[targetMetric + '-trending'] === true ? 'block' : 'none';

        // console.log(metricComparison);

        $('#' + targetMetric + ' .icon use').attr('xlink:href', 'img/metric-icons.svg#' + metricClass);
        $('#' + targetMetric).attr('class', metricClass);
        $('#' + targetMetric + ' .value').text(metricValue);
        $('#' + targetMetric + ' .name').text(metricName);
        $('#' + targetMetric + ' .comparison').text(metricComparison);
        $('#' + targetMetric + ' .trending').css('display', metricTrending);

    }

    function makeClassName(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    // var updater = 1;
    // $('input, select').on('change', function() {
    //     updater++;
    //     console.log('Updating');
    //     jsonData['hero-metric-value'] = updater;
    //     updateSnapshot();
    // });

    var fs = require('fs');
    fs.writeFile("/tmp/test", "Hey there!", function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

});
