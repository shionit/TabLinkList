
alert("start!");

output = "";

function readTabs() {
  output = "";
  chrome.windows.getCurrent({"populate":true},
    function(currentWindow) {
      for (var i = 0; i < currentWindow.tabs.length; i++) {
        var title = currentWindow.tabs[i].title;
        var url = currentWindow.tabs[i].url;
        
        var item = title + "\n" + url;
        output += item + "\n\n"
      }
      alert("1.output is:\n\n" + output);
    });
  alert("2.output is:\n\n" + output);
  return output;
}

// テキストをクリップボードにコピーする関数
function copyTextToClipboard(txt){
  if (txt) {
    try {
      var copyArea = document.getElementById("preview");
      copyArea.select();
      document.execCommand("Copy");
    } catch (e) {
      alert(e);
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  readTabs();
  alert("3.output is:\n\n" + output);

  try {
    var previewArea = document.getElementById("preview")
    previewArea.appendChild(document.createTextNode(output));
    alert("readed!" + output);
  } catch (e) {
    alert(e);
  }

  //copyTextToClipboard(output);
  copyTextToClipboard("Wow! This is Copy test.");

  alert("copy done!");

  alert("end");
});

