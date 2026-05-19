// JavaScript source code
function TrainPlace(sta1, sta2, updown, count, position, type, dianame) {

    //在線位置を探す//
    if (sta2 == null) {
        Place_name = sta1
    }
    else {
        Place_name = sta1 + '-' + sta2
    }

    if (sta2 == null) {
        const match = sta1.match(/^([A-Z0-9]+)_(up|down)(\d+)$/);
        if (match) {
            Place_name = match[1];
            Train_icon_position = 'train-icon-' + match[2] + match[3];
        } else {
            Train_icon_position = 'train-icon-' + updown + position;
        }
    } else {
        Train_icon_position = 'train-icon-ss' + count + '-' + updown + position;
    }

    Train_icon_container = document.getElementById(Place_name);

    if (Train_icon_container == null) {
        console.error('Train icon container not found for place: ' + Place_name);
        return;
    }

    Train_icon = 'train-' + updown + '-' + type;



    //遅延テキストを生成
    const trainInfo = Location_data && Location_data.TrainInfos ? Location_data.TrainInfos[dianame] : null;
    const delay = trainInfo ? Math.max(0, trainInfo.Delay ?? 0) : 0;
    const delayHtml = delay > 0
        ? `<span class="train-delay-label train-delay-${updown}">${delay}</span>`
        : '';

    Train_icon_container.innerHTML +=
        `<div class="train-icon ${Train_icon} ${Train_icon_position}" data-train-id="${dianame}">${delayHtml}</div>`;



    // <div class="train-icon-ss1-up1"></div>   <!-- 上り1-1 -->
}