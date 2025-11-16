(function () {
  "use strict";

  var INCLUDE_ATTR = "data-include";
  var MODE_ATTR = "data-include-mode";

  function fetchPartialSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    try {
      request.send();
    } catch (error) {
      throw new Error("Request for " + url + " failed: " + error.message);
    }

    if (request.status >= 200 && request.status < 300) {
      return request.responseText;
    }

    throw new Error(
      "Request for " + url + " returned status " + request.status
    );
  }

  function injectPartial(node, html, mode) {
    if (mode === "replace") {
      node.outerHTML = html;
    } else {
      node.innerHTML = html;
    }
  }

  function hydratePartials() {
    var placeholders = Array.prototype.slice.call(
      document.querySelectorAll("[" + INCLUDE_ATTR + "]")
    );

    placeholders.forEach(function (placeholder) {
      var src = placeholder.getAttribute(INCLUDE_ATTR);
      if (!src) {
        return;
      }

      var mode = placeholder.getAttribute(MODE_ATTR) || "append";

      try {
        var html = fetchPartialSync(src);
        injectPartial(placeholder, html, mode);
      } catch (error) {
        console.error("Failed to load partial", src, error);
        placeholder.innerHTML = "";
        placeholder.removeAttribute(INCLUDE_ATTR);
        placeholder.setAttribute("data-partial-error", "true");
      }
    });
  }

  hydratePartials();
})();
