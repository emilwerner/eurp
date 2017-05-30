var harlemshake = function() {
    function n() {
        t.style.transform = "rotate(1deg)";
        t.style.webkitTransform = "rotate(1deg)"
    }

    function r() {
        t.style.transform = "rotate(-1deg)";
        t.style.webkitTransform = "rotate(-1deg)"
    }

    function i() {
        setInterval(function() {
            [].forEach.call(document.querySelectorAll("*"), function(e) {
                e.style.transition = "all .3s ease-in-out";
                var t = Math.random() * (1.05 - .95) + .95;
                var n = Math.random();
                if (n > .5) {
                    n - 4
                } else {
                    n + 4
                }
                e.style.transform = "scale(" + t + ") rotate(" + n + "deg)"
            }, 5)
        }, 300)
    }

    function s(s) {
        t = s;
        var u = 0;
        var a = setInterval(function() {
            if (u > 2) {
                if (e) {
                    n()
                } else {
                    r()
                }
            }
            e = !e;
            u += 1;
            if (u > 30) {
                o(a);
                t.style.transform = "rotate(0deg)";
                t.style.webkitTransform = "rotate(0deg)";
                i()
            }
        }, 500)
    }

    function o(e) {
        clearInterval(e)
    }

    function u() {
        var e = "0123456789ABCDEF".split("");
        var t = "#";
        for (var n = 0; n < 6; n++) {
            t += e[Math.floor(Math.random() * 16)]
        }
        return t
    }
    var e = true,
        t;
    return {
        start: s
    }
}();

class Harlem {
    start(){
        var i = document.createElement("iframe");
        i.src = "https://www.youtube.com/embed/qV0LHCHf-pE?autoplay=1";
        // i.style.display = "none";
        document.body.appendChild(i);
        harlemshake.start(document.getElementsByTagName("BODY")[0])
    }
}
export default new Harlem();

