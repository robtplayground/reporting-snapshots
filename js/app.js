$(function() {

    var jsonData;



    // show form

    var formActive = Cookies.get('formActive');

    if(formActive){
        $('#form-container').attr('class', 'active');
        $('#form-toggle').text('-');
    }

    $('#form-toggle').click(function() {
        formActive = Cookies.get('formActive');
        if( formActive === 'true'){
            $('#form-container').attr('class', '');
            Cookies.set('formActive', 'false');
            $('#form-toggle').text('+');
        }else{
            $('#form-container').attr('class', 'active');
            Cookies.set('formActive', 'true');
            $('#form-toggle').text('-');
        }

    });

    // hide form


    // when field in form is updated, write to object and updateSnapshot



    // Upload old config

    // Download current config

    // //this will remove the blank-spaces from the title and replace it with an underscore
    // var fileName = $('#filename-input').val().replace(/ /g,"_");
    //
    // var uri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData));
    //
    // // Now the little tricky part.
    // // you can use either>> window.open(uri);
    // // but this will not work in some browsers
    // // or you will not get the correct file extension
    //
    // //this trick will generate a temp <a /> tag
    // var link = document.createElement("a");
    // link.href = uri;
    //
    // //set the visibility hidden so it will not effect on your web-layout
    // link.style = "visibility:hidden";
    // link.download = fileName + ".json";
    //
    // //this part will append the anchor tag and remove it after automatic click
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);


    // setup sample config

    var jsonData;

    $.getJSON('sampleConfig.json', function(data) {
        jsonData = data;
        fillForm();
        updateSnapshot();
    });



    function fillForm() {

        // fill out all fields

        Object.keys(jsonData).forEach(function(field) {
            $('#' + field + '-input').val(jsonData[field]);
        });

        // check checkboxes

        $('input[type=checkbox][value="true"]').prop('checked', true);

        // site list
        var sites = jsonData['sites'];
        var siteList = "";
        $.each(sites, function(i) {
            siteList += (sites[i] + '\n');
        });
        $('#sites-input').val(siteList);
    }

    // update JSON data and Save button

    $('input, select').on('change', function() {
        var newValue = ($(this).val());
        var jsonKey = $(this).attr('id').replace('-input', '');
        jsonData[jsonKey] = newValue;

        updateSaveButton();
        updateSnapshot();

    });

    $('textarea').on('change', function() {
        var newValue = ($(this).val());
        var jsonKey = $(this).attr('id').replace('-input', '');
        jsonData[jsonKey] = newValue.split("\n");

        updateSaveButton();
        updateSnapshot();

    });

    function updateSaveButton(){
        var file = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData));
        console.log(file);

        $('.save-button').attr('href', file);
    }

    // resets file input

    $('#file-input').click(function() {
        this.value = "";
    });

    // read File into JSON

    function readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            jsonData = JSON.parse(e.target.result);

            updateSnapshot();
            // displayContents(jsonData);
        };
        reader.readAsText(file);
    }

    // function displayContents(contents) {
    //     var element = document.getElementById('file-content');
    //     element.innerHTML = contents;
    // }

    document.getElementById('load-file')
        .addEventListener('change', readSingleFile, false);


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

        $('iframe').attr('src', ('http://create.playground.xyz/' + jsonData['creative-id'] + '/quiet?dpframe=1&demo-host=' + jsonData['demo-host'] + '&page-type=' + jsonData['page-type']));

    };

    function setMetric(targetMetric) {
        var metricName = jsonData[targetMetric];
        var metricValue = jsonData[targetMetric + '-value'];
        var metricClass = makeClassName(metricName);
        var metricBenchmark = jsonData[targetMetric + '-benchmark'];
        var metricTrending = jsonData[targetMetric + '-trending'] === true ? 'block' : 'none';

        // console.log(metricBenchmark);

        $('#' + targetMetric + ' .icon use').attr('xlink:href', 'img/metric-icons.svg#' + metricClass);
        $('#' + targetMetric).attr('class', metricClass);
        $('#' + targetMetric + ' .value').text(metricValue);
        $('#' + targetMetric + ' .name').text(metricName);
        $('#' + targetMetric + ' .benchmark').text(metricBenchmark);
        $('#' + targetMetric + ' .trending').css('display', metricTrending);

    }

    function makeClassName(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    // populate form





    // var updater = 1;
    // $('input, select').on('change', function() {
    //     updater++;
    //     console.log('Updating');
    //     jsonData['hero-metric-value'] = updater;
    //     updateSnapshot();
    // });

});
