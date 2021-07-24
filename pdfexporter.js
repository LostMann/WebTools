//injection script
//var uu=await fetch('https://raw.githubusercontent.com/LostMann/WebTools/main/pdfexporter.js?'+new Date().getTime(),{cache: "no-cache"}).then(r => r.blob()).then(r=> window.URL.createObjectURL(new Blob([r], {type:'text/javascript'})));var ref = document.getElementsByTagName( "script" )[ 0 ];var script = document.createElement("script");script.src = uu;ref.parentNode.insertBefore(script,ref);
(function (w) {
  var myloadJS = function (src, cb, ordered) {
    "use strict";
    var tmp;
    var ref = w.document.getElementsByTagName("script")[0];
    var script = w.document.createElement("script");

    if (typeof cb === "boolean") {
      tmp = ordered;
      ordered = cb;
      cb = tmp;
    }

    script.src = src;
    script.async = !ordered;
    ref.parentNode.insertBefore(script, ref);

    if (cb && typeof cb === "function") {
      script.onload = cb;
    }
    return script;
  };
  // commonjs
  if (typeof module !== "undefined") {
    module.exports = myloadJS;
  } else {
    w.myloadJS = myloadJS;
  }
})(typeof global !== "undefined" ? global : this);

var doc = {};

myloadJS(
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js",
  () => {
    console.log("PDF JS loaded!");
    // myloadJS(
    //   "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.2.61/jspdf.min.js2",
    //   function () {
    //     console.log("PDF JS loaded!");        
    //   }
    // );
  }
);

function saveDiv(divId, title) {
  html2canvas(document.getElementById(divId))
    .then((canvas) => {
      doc = doc || new jsPDF();
      doc.fromHTML(
        `<html><head><title>${title}</title></head><body><img src="` +
          canvas.toDataURL() +
          `" style="width:100%;height:100%" /></body></html>`
      );
      doc.save("div.pdf");
    })
    .catch((err) => {
      console.log(err);
    });
}

function printDiv(divId, title, height, width, top, left) {
  html2canvas(document.getElementById(divId))
    .then((canvas) => {
      console.log(canvas);
      height = height || 650;
      width = width || 900;
      top = top || 100;
      left = left || 150;
      let mywindow = window.open(
        "",
        "PRINT",
        "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left
      );

      mywindow.document.write(`<html><head><title>${title}</title>`);
      mywindow.document.write("</head><body ><img src='");
      mywindow.document.write(canvas.toDataURL());
      mywindow.document.write("' style='width:100%;height:100%' /></body></html>");

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
    })
    .catch((err) => {
      console.log(err);
    });
}
