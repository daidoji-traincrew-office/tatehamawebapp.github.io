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

// コンソールから確認用
window.showSectionOrder = function() {
    console.table(
        Object.entries(sectionOrderMap).map(([place, val]) => ({
            駅間: place,
            上り: val.up.join(", ") || "なし",
            下り: val.down.join(", ") || "なし"
        }))
    );
};