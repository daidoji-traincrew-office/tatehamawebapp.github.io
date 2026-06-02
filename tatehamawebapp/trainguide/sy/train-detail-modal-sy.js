// --- 駅名・走行位置の読み替え関数（重複しないように1つだけ） ---
function getStationNameById(id) {
    if (!window.staname) return id;
    const found = staname.find(([stationId]) => stationId === id);
    return found ? found[1] : id;
}
function getTrackDisplayName(trackName, isUp = false) {
    if (!window.ss) return trackName;
    const found = ss.find(([name]) => name === trackName);
    if (found) {
        const [, sta1, sta2] = found;
        if (sta1 && sta2) {
            return isUp
                ? getStationNameById(sta2) + "〜" + getStationNameById(sta1)
                : getStationNameById(sta1) + "〜" + getStationNameById(sta2);
        } else if (sta1) {
            return getStationNameById(sta1);
        }
    }
    return trackName;
}

// --- モーダル表示本体 ---
function showTrainDetail(trainId) {
    const modal = document.getElementById('train-detail-modal');
    const body = document.getElementById('train-detail-body');

    if (!window.Location_data || !Location_data.TrainInfos) {
        body.innerHTML = `<h2>列車詳細</h2><p>データがありません。</p>`;
        modal.style.display = 'flex';
        return;
    }

    const train = Location_data.TrainInfos[trainId];

    // 上り/下りの判定
    let isUp = false;
    if (train) {
        const nameMatch = (train.Name || trainId).match(/(\d+)[^\d]*$/);
        if (nameMatch) {
            isUp = parseInt(nameMatch[1], 10) % 2 === 0;
        }
    }

    let trackName = '';
    let trackDisplay = '';
    if (Location_data.TrackCircuitData && train) {
        const track = Location_data.TrackCircuitData.find(tc => tc.Last === trainId);
        if (track) {
            trackName = track.Name;
            trackDisplay = getTrackDisplayName(trackName, isUp);
        }
    }

    // 種別名
    let kind = '';
    let kindClass = '';
    if (typeof getTrainTypeByClass === 'function' && train) {
        let type = TypeString(train.Name);

        if (1 <= train.TrainClass && train.TrainClass <= 23) {
            type = train.TrainClass;
        }

        kind = getTrainTypeByClass(type);
        kindClass = 'train-kind-' + kind;
    } else if (train) {
        kind = train.TrainClass ?? '';
        kindClass = '';
    }

    // 行先駅名
    let destName = train && train.DestinationStation ? getStationNameById(train.DestinationStation) : (train && train.Destinaton ? getStationNameById(train.Destinaton) : '');

    // 始発駅名
    let fromName = train && train.DestinationStation ? getStationNameById(train.FromStation) : (train && train.FromStation ? getStationNameById(train.FromStation) : '');

    // 編成両数
    const carCount = Array.isArray(train?.CarStates) ? train.CarStates.length : 0;

    // --- 車両画像のHTMLを生成 ---
    let carImagesHtml = '';
    if (Array.isArray(train?.CarStates)) {
        const r = getCarImageFileNames(train.CarStates, isUp);
        console.log(r);
        const imgList = r[0];
        var carString = r[1];
        carImagesHtml = `<div class="train-car-image-row">` +
            imgList.map((imgSrc, idx) => {
                const alt = train.CarStates[idx]?.CarModel ?? "";
                return `<img src="../${imgSrc}" alt="${alt}" class="car-image" onerror="this.onerror=null;this.src='../caricons/TC_9999.png';">`;
            }).join('') +
            `</div>`;
    }

    if (train) {

        // 進行方向の判定
        let directionHtml = '';
        if (isUp) {
            directionHtml = `<div class="train-direction-u">進行方向▶</div>`;
        } else {
            directionHtml = `<div class="train-direction-d">◀進行方向</div>`;
        }

        // 運行番号の抽出
        const nameMatch = (train.Name || trainId).match(/(\d+)[^\d]*$/);
        let operationNumber = '';
        if (nameMatch) {
            const numStr = nameMatch[1];
            let opNum = '';
            if (numStr.length >= 2) {
                opNum = numStr.slice(-2);
            } else if (numStr.length === 1) {
                opNum = numStr;
            }
            let opNumInt = parseInt(opNum, 10);
            const baseNum = parseInt(numStr, 10);
            if (opNumInt % 2 === 1) {
                opNumInt = opNumInt - 1;
            }
            if (baseNum > 9000) {
                opNumInt += 300;
            } else if (baseNum > 6000) {
                opNumInt += 200;
            } else if (baseNum > 3000) {
                opNumInt += 100;
            }
            operationNumber = opNumInt.toString().padStart(opNum.length, '0');
        }

        // ラベル行を追加
        const carLabelHtml = `
      <div class="route-direction">
        <span class="route-direction-d">館浜側</span>
        <span class="route-direction-u">大手橋側</span>
      </div>
    `;

        // 時刻表HTML（train-timetable.js の buildTimetableHtmlを利用）
        const timetableHtml = typeof buildTimetableHtml === 'function' ? buildTimetableHtml(train) : '';

        body.innerHTML = `
      <h2>列車詳細</h2>
            ${carLabelHtml}
            ${carImagesHtml}
            ${directionHtml}
      <table>
        <tr><th>列車番号</th><td>${ HIDE ? '?????' : train.Name || trainId}</td></tr>
        <tr><th>運行番号</th><td>${ HIDE ? '??' : operationNumber}運行</td></tr>
        <tr><th>組成</th><td>${carString}</td></tr>
        <tr><th>遅延</th><td>${Math.max(0, train.Delay ?? 0)} 分</td></tr>
        <tr><th>種別</th><td><span class="${kindClass}">${HIDE ? '？？' : kind}</span></td></tr>
        <tr><th>始発</th><td>${ HIDE ? '？？？' : fromName}</td></tr>
        <tr><th>行先</th><td>${ HIDE ? '？？？' : destName}</td></tr>
        <tr><th>両数</th><td>${carCount} 両</td></tr>
        <tr><th>位置</th><td>${trackDisplay || trackName}</td></tr>
      </table>
      ${timetableHtml}
    `;
    } else {
        body.innerHTML = `<h2>列車詳細</h2><p>列番: ${trainId}</p><p>詳細データがありません。</p>`;
    }
    modal.style.display = 'flex';
}

// --- モーダルを閉じる ---
function closeTrainDetail() {
    document.getElementById('train-detail-modal').style.display = 'none';
}

// --- イベントリスナーを追加 ---
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        const icon = e.target.closest('.train-icon');
        if (icon) {
            const trainId = icon.dataset.trainId || '不明';
            showTrainDetail(trainId);
        }
    });
    const closeBtn = document.getElementById('train-detail-close');
    if (closeBtn) {
        closeBtn.onclick = closeTrainDetail;
    }
    const modal = document.getElementById('train-detail-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeTrainDetail();
        });
    }
});