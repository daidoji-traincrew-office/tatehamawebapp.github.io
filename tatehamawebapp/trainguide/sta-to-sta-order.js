// 駅間ごとの列車順番を記憶するマップ
// { "TH67-TH68": { "up": ["1585C", "1298C"], "down": [...] } }
var sectionOrderMap = {};

function getSortedDianameList(placeName, updown, dianameList) {
    if (!sectionOrderMap[placeName]) {
        sectionOrderMap[placeName] = { up: [], down: [] };
    }
    const prevOrder = sectionOrderMap[placeName][updown];

    // 前回の順番を維持しつつ、新規列車を末尾に追加
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

    // 記憶を更新
    sectionOrderMap[placeName][updown] = newOrder;
    return newOrder;
}