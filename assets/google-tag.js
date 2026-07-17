(function (global) {
  "use strict";

  var GA_ID = "G-RH0ZBJSG78";

  global.dataLayer = global.dataLayer || [];
  function gtag() {
    global.dataLayer.push(arguments);
  }
  global.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  (document.head || document.documentElement).appendChild(script);
})(window);
