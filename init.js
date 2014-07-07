(function() {
    if (window.addEventListener) window.addEventListener('load', outputDetection, false);
    else if (window.attachEvent) window.attachEvent('onload', outputDetection);
    else window.onload = outputDetection;
})();

function outputDetection() {
    with (document) {
        getElementById('canvas').innerHTML = featuresHTML5detect().canvas();
        getElementById('canvas_text').innerHTML = featuresHTML5detect().canvasText();
        getElementById('video').innerHTML = featuresHTML5detect().video();
        getElementById('video_type').innerHTML = featuresHTML5detect().videoTypes();
        getElementById('geo').innerHTML = featuresHTML5detect().geo();
        getElementById('worker').innerHTML = featuresHTML5detect().webWorker();
        getElementById('off_app').innerHTML = featuresHTML5detect().offApp();
        getElementById('storage').innerHTML = featuresHTML5detect().lStorage();
        getElementById('i_type').innerHTML = featuresHTML5detect().iType();
        getElementById('history').innerHTML = featuresHTML5detect().historyAPI();
        getElementById('autofocus').innerHTML = featuresHTML5detect().autoFocus();
        getElementById('placeholder').innerHTML = featuresHTML5detect().placeHolder();
        getElementById('microdata').innerHTML = featuresHTML5detect().microData();
    }
}
function featuresHTML5detect() {
    return {
        canvas: function() {
            return !!document.createElement('canvas').getContext;
        },
        canvasText: function() {
            return this.canvas() ? typeof document.createElement('canvas').getContext('2d').fillText == 'function' : 'false';
        },
        video: function() {
            return !!document.createElement('video').canPlayType;
        },
        videoTypes: function() {
            var elem = document.createElement('video'),
                support = [];
            if (this.video()) {
                if (elem.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') == 'probably') support.push('H.264, AAC, MP4');
                if (elem.canPlayType('video/ogg; codecs="theora, vorbis"') == 'probably') support.push('Ogg Vorbis');
                if (elem.canPlayType('video/webm; codecs="vp8, vorbis"') == 'probably') support.push('WebM');
                return support ? support.join('; ') : 'Other';
            } else {
                return 'Not supported any formats';
            }
        },
        geo: function() {
            return !!navigator.geolocation;
        },
        webWorker: function() {
            return !!window.Worker;
        },
        offApp: function() {
            return !!window.applicationCache;
        },
        lStorage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
                return false;
            }
        },
        iType: function() {
            var elem = document.createElement('input'),
                types = [
                    {
                        type: 'search',
                        support: ''
                    },
                    {
                        type: 'number',
                        support: ''
                    },
                    {
                        type: 'range',
                        support: ''
                    },
                    {
                        type: 'color',
                        support: ''
                    },
                    {
                        type: 'tel',
                        support: ''
                    },
                    {
                        type: 'url',
                        support: ''
                    },
                    {
                        type: 'email',
                        support: ''
                    },
                    {
                        type: 'date',
                        support: ''
                    },
                    {
                        type: 'month',
                        support: ''
                    },
                    {
                        type: 'week',
                        support: ''
                    },
                    {
                        type: 'time',
                        support: ''
                    },
                    {
                        type: 'datetime',
                        support: ''
                    },
                    {
                        type: 'datetime-local',
                        support: ''
                    }
                ], results = [];
            for (var i = 0; i < types.length; i++) {
                types[i].support = elem.setAttribute('type', types[i].type) !== 'text';
                results.push(types[i].type + ': ' + types[i].support);
            }
            return results.join('; ');
        },
        historyAPI: function() {
            return !!(window.history && history.pushState);
        },
        autoFocus: function() {
            return 'autofocus' in document.createElement('input');
        },
        placeHolder: function() {
            return  'placeholder' in document.createElement('input');
        },
        microData: function() {
            return !!document.getItems;
        }
    };
}
