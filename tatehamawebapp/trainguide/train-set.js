// JavaScript source code





//取得したデータから置くアイコン、nameから上下を判別し、上下別にカウントする//
function checkLastEvenOdd(dianameList, TrainInfos) {
    // 上下別にカウント
    let upCount = 0;
    let downCount = 0;
    // 各列車の上下情報を記録
    const directionMap = {};

    dianameList.forEach(dianame => {
        const train = TrainInfos[dianame];
        if (!train) return;
        const direction = getDirectionByName(train.Name);
        directionMap[dianame] = direction;
        if (direction === "up") {
            upCount++;
        } else if (direction === "down") {
            downCount++;
        }
    });

    return { upCount, downCount, directionMap };
}

function getTrainTypeByClass(trainClass) {
    switch (String(trainClass)) {

        case "1":
            kind = "普通";
            break;
        case "2":
            kind = "区間準急";
            break;
        case "3":
            kind = "準急";
            break;
        case "4":
            kind = "急行";
            break;
        case "5":
            kind = "快速急行";
            break;
        case "6":
            kind = "臨時普通";
            break;
        case "7":
            kind = "臨時準急";
            break;
        case "8":
            kind = "臨時急行";
            break;
        case "9":
            kind = "臨時快速急行";
            break;
        case "10":
        case "11":
        case "12":
        case "13":
        case "14":
        case "15":
        case "16":
        case "17":
            kind = "特急";
            break;
        case "18":
            kind = "臨時";
            break;
        case "19":
            kind = "試運転";
            break;
        case "20":
            kind = "回送";
            break;
        case "21":
            kind = "団体";
            break;
        case "22":
            kind = "区間急行";
            break;
        case "23":
            kind = "臨時区間急行";
            break;
        case "24":
            kind = "臨時特急";
            break;

        default:
            kind = "判別不能";
            break;
    }
    return kind;

    }

function TypeString(retsuban) {
    let Retsuban = retsuban.replace(/X|Y|Z/g, "");
    if (Retsuban === "9999") {
        return 0;
    }
    if (Retsuban.includes("溝月")) {
        return 0;
    }
    if (Retsuban.startsWith("回")) {
        return 20;
    }
    if (Retsuban.startsWith("試")) {
        return 19;
    }

    if (Retsuban.startsWith("臨")) {
        if (Retsuban.includes("回")) {
            return 20;
        }
        if (Retsuban.includes("A")) {
            return 24;
        }
        if (Retsuban.includes("K")) {
            return 9;
        }
        if (Retsuban.includes("B")) {
            return 8;
        }
        if (Retsuban.includes("C")) {
            return 7;
        }
        if (Retsuban.includes("D")) {
            return 23;
        }
        return 6;
    } else {
        if (Retsuban.includes("A")) {
            return 17;
        }
        if (Retsuban.includes("K")) {
            return 5;
        }
        if (Retsuban.includes("B")) {
            return 4;
        }
        if (Retsuban.includes("C")) {
            return 3;
        }
        if (Retsuban.includes("D")) {
            return 22;
        }
    }
    return 1;
}

function getDirectionByName(name) {
    // 末尾の数字を抽出
    const match = name.match(/(\d+)(?!.*\d)/);
    if (match) {
        const lastDigit = parseInt(match[1].slice(-1), 10);
        if (!isNaN(lastDigit)) {
            return (lastDigit % 2 === 0) ? "up" : "down";
        }
    }
    // 数字がなければ不明
    return "unknown";
}

function placeAllTrainIconsByLocation() {
    if (!Location_data || !Location_data.TrainInfos) return;

    const locationDianame = location_to_place();

    Object.keys(locationDianame).forEach(placeName => {
        const dianameList = locationDianame[placeName];
        if (!Array.isArray(dianameList) || dianameList.length === 0) return;

        const { upCount, downCount, directionMap } = checkLastEvenOdd(dianameList, Location_data.TrainInfos);

        const isSection = placeName.includes('-');

        const upList   = dianameList.filter(d => directionMap[d] === "up");
        const downList = dianameList.filter(d => directionMap[d] === "down");
        const sortedUp   = isSection ? getSortedDianameList(placeName, "up",   upList)   : upList;
        const sortedDown = isSection ? getSortedDianameList(placeName, "down", downList) : downList;

        dianameList.forEach(dianame => {
            const trainInfo = Location_data.TrainInfos[dianame];
            if (!trainInfo) return;
            let type = TypeString(dianame);
            if (1 <= trainInfo.TrainClass && trainInfo.TrainClass <= 23) {
                type = HIDE ? 0 : trainInfo.TrainClass;
            }

            const updown = directionMap[dianame];
            let sta1 = placeName;
            let sta2 = null;
            if (placeName.includes('-')) {
                [sta1, sta2] = placeName.split('-');
            }

            let position = 1;
            let count = 1;
            if (updown === "up") {
                position = sortedUp.indexOf(dianame) + 1;
                count = upCount;
            } else if (updown === "down") {
                position = sortedDown.indexOf(dianame) + 1;
                count = downCount;
            }

            TrainPlace(sta1, sta2, updown, count, position, type, dianame);
        });
    });
}