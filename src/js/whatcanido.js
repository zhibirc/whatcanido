var doc = document;

function whatcanidoInit () {
    var features = getFeatures();

    window.whatcanido = {};

    Object.keys(features).forEach(function ( key ) {
        window.whatcanido[key] = features[key];
    });

    window.whatcanido.printTable = function () {
        var tbody = doc.createElement('tbody'),
            pull  = [];

        Object.keys(features).forEach(function ( key ) {
            var parts = key.split('_'),
                item  = '<tr><td>' + parts[1] + (parts[0] ? ' (' + parts[0].toUpperCase() + ')' : '') + '</td><td>' + features[key] + '</td></tr>';

            tbody.innerHTML += item;
            pull.push(item.replace(/<.+?>/g, ''));
        });

        doc.getElementsByTagName('table')[0].appendChild(tbody);
        console.log(pull.join('\n'));
    };

    whatcanido.printTable();
}


function getFeatures () {
    var inputDummy  = doc.createElement('input'),
        canvasDummy = doc.createElement('canvas'),
        docEl       = document.documentElement,
        util        = {
            /** Simple create element method. */
            create : function ( el ) {
                return doc.createElement(el);
            },

            /** Test if it's an old device that we want to filter out. */
            old : !!(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent)),

            /**
             * Function that takes a standard CSS property name as a parameter and
             * returns it's prefixed version valid for current browser it runs in
             */
            pfx : (function () {
                var style    = doc.createElement('dummy').style,
                    prefixes = ["Webkit", "Moz", "O", "ms"],
                    memory   = {};

                return function ( prop ) {
                    if ( typeof memory[prop] === 'undefined' ) {
                        var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
                            props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");

                        memory[prop] = null;

                        for ( var i in props ) {
                            if ( style[props[i]] !== undefined ) {
                                memory[prop] = props[i];
                                break;
                            }
                        }
                    }

                    return memory[prop];
                };
            }())
        };

    return {
        _css3Dtransform : (function () {
            var test = (!util.old && util.pfx('perspective') !== null);

            return !!test;
        }()),

        _cssTransform : (function () {
            var test = (!util.old && util.pfx('transformOrigin') !== null);

            return !!test;
        }()),


        _cssTransition : (function () {
            var test = util.pfx('transition') !== null;

            return !!test;
        }()),

        _addEventListener : !!window.addEventListener,

        _querySelectorAll : !!doc.querySelectorAll,

        _deviceMotion : ('DeviceMotionEvent' in window),

        _deviceOrientation : ('DeviceOrientationEvent' in window),

        attr_placeholder: (function () {
            return 'placeholder' in inputDummy;
        }()),

        attr_autofocus: (function () {
            return 'autofocus' in inputDummy;
        }()),

        _viewportUnit: (function ( el ) {
            try {
                el.style.width = "1vw";

                var test = el.style.width !== "";

                return !!test;
            } catch ( error ) {
                return false;
            }
        }(util.create('dummy'))),

        _remUnit: (function ( el ) {
            try {
                el.style.width = '1rem';

                var test = el.style.width !== '';

                return !!test;
            } catch ( error ) {
                return false;
            }
        }(util.create('dummy'))),

        attr_inputTypes: (function () {
            var types = ['search', 'number', 'range', 'color', 'tel', 'url', 'email', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local'],
                result = {},
                index;

            for ( index = 0; index < types.length; index += 1 ) {
                result[types[index]] = inputDummy.setAttribute('type', types[index]) !== 'text';
            }

            return JSON.stringify(result);
        }()),

        _svg : !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,

        // APIs

        api_classList : ('classList' in docEl),

        api_localStorage: (function () {
            var test = 'x';

            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);

                return true;
            } catch ( error ) {
                return false;
            }
        }()),

        api_sessionStorage: (function () {
            var test = 'x';

            try {
                sessionStorage.setItem(test, test);
                sessionStorage.removeItem(test);

                return true;
            } catch ( error ) {
                return false;
            }
        }()),

        api_matchMedia : !!window.matchMedia,

        api_webGL : (function ( el ) {
            try {
                return !!(window.WebGLRenderingContext && (el.getContext("webgl") || el.getContext("experimental-webgl")));
            } catch ( error ) {
                return false;
            }
        }(util.create('canvas'))),

        api_webSockets: 'WebSocket' in window || 'MozWebSocket' in window,

        api_canvas: (function () {
            return !!canvasDummy.getContext;
        }()),

        api_canvasText: (function () {
            return !!canvasDummy.getContext && typeof canvasDummy.getContext('2d').fillText === 'function';
        }()),

        api_WebWorker: (function () {
            return !!window.Worker;
        }()),

        api_microdata: (function () {
            return !!doc.getItems;
        }()),

        api_history: (function () {
            return !!(window.history && history.pushState);
        }()),

        api_geolocation: (function () {
            return !!navigator.geolocation;
        }()),

        api_offlineApp: (function () {
            return !!window.applicationCache;
        }()),

        api_serviceWorker : ('serviceWorker' in navigator),

        api_indexedDB: (function () {
            var passed = false,
                indexedDB;

            try {
                indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB || window.oIndexedDB || window.msIndexedDB;

                passed = true;

                if ( indexedDB && ! 'deleteDatabase' in indexedDB ) {
                    passed = false;
                }
            } catch ( error ) {
                /* If we get a security exception we know the feature exists, but cookies are disabled */
                if ( error.name == 'NS_ERROR_DOM_SECURITY_ERR' || error.name == 'SecurityError' ) {
                    passed = true;
                }
            }

            return passed;
        }()),

        _cors : ('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest()),

        // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
        _touch : !!(('ontouchstart' in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),

        attr_async : ('async' in util.create('script')),

        // Test if defer attribute is supported
        attr_defer : ('defer' in util.create('script')),

        // Test if img srcset attribute is supported
        attr_srcset : ('srcset' in util.create('img')),

        // Test if img sizes attribute is supported
        attr_sizes : ('sizes' in util.create('img')),

        // TAGs

        // Test if Picture element is supported
        tag_pictureElement : ('HTMLPictureElement' in window),

        tag_video: (function () {
            return !!util.create('video').canPlayType;
        }()),

        tag_contextMenu : ('contextMenu' in docEl && 'HTMLMenuItemElement' in window)
    };
}
