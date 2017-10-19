(function() {
    amihtml5Init();
    if (window.addEventListener) window.addEventListener('load', outputDetection, false);
    else if (window.attachEvent) window.attachEvent('onload', outputDetection);
    else window.onload = outputDetection;
})();

function outputDetection() {
    with (document) {
        getElementById('canvas').innerHTML = amihtml5.canvas;
        getElementById('canvas_text').innerHTML = amihtml5.canvas_text;
        getElementById('video').innerHTML = amihtml5.video;
        getElementById('geo').innerHTML = amihtml5.geo;
        getElementById('worker').innerHTML = amihtml5.worker;
        getElementById('off_app').innerHTML = amihtml5.off_app;
        getElementById('storage').innerHTML = amihtml5.storage;
        // or any other type from the 13 of available
        getElementById('i_type').innerHTML = amihtml5.input.search;
        getElementById('history').innerHTML = amihtml5.history;
        getElementById('autofocus').innerHTML = amihtml5.autofocus;
        getElementById('placeholder').innerHTML = amihtml5.placeholder;
        getElementById('microdata').innerHTML = amihtml5.microdata;
    }
}
