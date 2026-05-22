// 駅間ごとの列車順番を記憶するマップ
// { "TH67-TH68": { "up": ["1585C", "1298C"], "down": [...] } }
var sectionOrderMap = {};

function getSortedDianameList(placeName, updown, dianameList) {
    if (!sectionOrderMap[placeName]) {
        sectionOrderMap[placeName] = { up: [], down: [] };
    }
    const prevOrder = sectionOrderMap[placeName][updown];

    const newOrder = [];
    prevOrder.forEach(dianame => {
        if (dianameList.includes(dianame)) {
            newOrder.push(dianame);
        }
    });
    dianameList.forEach(dianame => {
        if (!newOrder.includes(dianame)) {
            newOrder.push(dianame);
        }
    });

    sectionOrderMap[placeName][updown] = newOrder;
    return newOrder;
}

// コンソールから確認用: showSectionOrder() で呼び出す
window.showSectionOrder = function() {
    Object.entries(sectionOrderMap).forEach(([place, val]) => {
        console.log(place + " | up: " + val.up.join(", ") + " | down: " + val.down.join(", "));
    });
    if (Object.keys(sectionOrderMap).length === 0) {
        console.log("在線検知なし");
    }
};