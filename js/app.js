$(function() {

    var jsonData;

    // Load saved file

    var jsonFile;

    $.getJSON(jsonFile, function(data) {
        jsonData = data;
        updateSnapshot();
    });

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

        var sites  = jsonData['sites'];
        var siteList = $('<ul/>');
        $.each(sites, function(i){
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
    };

    function setMetric(targetMetric){
        var metricName = jsonData[targetMetric];
        var metricValue = jsonData[targetMetric + '-value'];
        var metricClass = makeClassName(metricName);
        var metricComparison = jsonData[targetMetric + '-comparison'];
        var metricTrending = jsonData[targetMetric + '-trending'] === true ?  'block':'none';

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

    // Advertiser Name
    var updater = 1;
    $('input, select').on('change', function() {
      updater++;
      console.log('Updating');
        jsonData['hero-metric-value'] = updater;
        updateSnapshot();
    });

    //  load image by ajax

});
