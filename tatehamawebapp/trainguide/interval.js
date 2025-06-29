
async function Interval() {

    await Getdata();
    // Train_icon_containerクラスの全要素の中身を消去
    const containers = document.getElementsByClassName('train-icon-container');
    for (let i = 0; i < containers.length; i++) {
        containers[i].innerHTML = '';
    }
    placeAllTrainIconsByLocation();
    updateInformationText();
    updateTime();
}

document.addEventListener('DOMContentLoaded', async function () {
    await Interval();
    // 10秒ごとに実行
    setInterval(Interval, 10000);
    initInfo();
}
);