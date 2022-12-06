setInterval(function () {
    let t = $("#videoContent > div.vjs-control-bar > div.vjs-progress-control.vjs-control > div").attr("aria-valuenow");
    if (t=="100.00"){
        $("#videoContent > div.vjs-control-bar > button.vjs-play-control.vjs-control.vjs-button.vjs-paused").click();
        console.log("repeating...");
    }
}, 1000);
