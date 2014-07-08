/*
 Copyright (C) zhibirc  Developer

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version.  The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.
*/

function amihtml5Init() {
    window.amihtml5 = {
        placeholder: detectFeatures().placeholder(),
        autofocus: detectFeatures().autofocus(),
        storage: detectFeatures().storage(),
        worker: detectFeatures().worker(),
        microdata: detectFeatures().microdata(),
        history: detectFeatures().history(),
        geo: detectFeatures().geo(),
        off_app: detectFeatures().offApp(),
        video: detectFeatures().video(),
        canvas: detectFeatures().canvas(),
        canvas_text: detectFeatures().canvasText(),
        input: detectFeatures().inputTypes()
    };
}

function detectFeatures() {
    var i = document.createElement('input'),
        c = document.createElement('canvas');
    return {
        placeholder: function() {
            return  'placeholder' in i;
        },
        autofocus: function() {
            return 'autofocus' in i;
        },
        storage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
                return false;
            }
        },
        worker: function() {
            return !!window.Worker;
        },
        microdata: function() {
            return !!document.getItems;
        },
        history: function() {
            return !!(window.history && history.pushState);
        },
        geo: function() {
            return !!navigator.geolocation;
        },
        offApp: function() {
            return !!window.applicationCache;
        },
        video: function() {
            return !!document.createElement('video').canPlayType;
        },
        canvas: function() {
            return !!c.getContext;
        },
        canvasText: function() {
            return this.canvas() ? typeof c.getContext('2d').fillText == 'function' : 'false';
        },
        inputTypes: function() {
            var types = ['search', 'number', 'range', 'color', 'tel', 'url', 'email', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local'],
                result = {};
            for (var k = 0; k < types.length; k++)
                result[types[k]] = i.setAttribute('type', types[k]) !== 'text';
            return result;
        }
    };
}
