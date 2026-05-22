// --- 時刻表表示関連 ---

// 時刻文字列 "HH:mm:ss" に遅延分を加算し "HH:mm" で返す
function addDelayToTime(timeStr, delayMin) {
    if (!timeStr) return null;
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    let h = parseInt(parts[0], 10);
    let m = parseInt(parts[1], 10);
    m += delayMin;
    h += Math.floor(m / 60);
    m = m % 60;
    h = h % 24;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

// 時刻文字列を "HH:mm" 形式に整形
function formatTime(timeStr) {
    if (!timeStr) return null;
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    return parts[0].padStart(2, '0') + ':' + parts[1].padStart(2, '0');
}

// 時刻表の展開/折りたたみ切り替え
function toggleTimetable() {
    const body = document.getElementById('timetable-body');
    const toggle = document.getElementById('timetable-toggle');
    if (!body || !toggle) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? '' : 'none';
    toggle.textContent = isHidden ? '▲' : '▼';
}

// 時刻表HTMLを生成
function buildTimetableHtml(train) {
    const noDataClasses = [18, 19, 20, 21, 25];
    if (noDataClasses.includes(train?.TrainClass)) {
        return `
        <div class="timetable-section">
            <table class="timetable-table">
                <thead>
                    <tr>
                        <th colspan="3" class="timetable-header">
                            時刻表
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colspan="3" class="timetable-no-data">時刻データなし</td></tr>
                </tbody>
            </table>
        </div>`;
    }

    if (!Array.isArray(train?.Timetable) || train.Timetable.length === 0) return '';
    const delay = Math.max(0, train.Delay ?? 0);

    const filtered = train.Timetable.filter(entry => entry.StationId && !entry.StationId.endsWith('S'));

    const rows = filtered
        .map((entry, index) => {
            const stationName = getStationNameById(entry.StationId);

            let baseTime = null;
            let isPass = false;
            const hasDepart = entry.DepartureTime !== null && entry.DepartureTime !== undefined && entry.DepartureTime !== '';
            const hasArrive = entry.ArrivalTime !== null && entry.ArrivalTime !== undefined && entry.ArrivalTime !== '';

            if (index === 0) {
                // 始発駅はDepartureTimeを表示
                if (hasDepart) {
                    baseTime = entry.DepartureTime;
                } else {
                    isPass = true;
                }
            } else if (hasDepart && hasArrive) {
                baseTime = entry.DepartureTime;
            } else if (!hasDepart && hasArrive) {
                baseTime = entry.ArrivalTime;
            } else {
                isPass = true;
            }

            console.log(`[timetable] ${entry.StationId} D:${entry.DepartureTime} A:${entry.ArrivalTime} → ${isPass ? '通過' : baseTime}`);

            let scheduledCell = '';
            let estimatedCell = '';

            if (isPass) {
                scheduledCell = `<span class="timetable-pass">通過</span>`;
                estimatedCell = ``;
            } else {
                const scheduledStr = formatTime(baseTime);
                scheduledCell = `<span class="timetable-scheduled">${scheduledStr}</span>`;
                if (delay > 0) {
                    const estimatedStr = addDelayToTime(baseTime, delay);
                    estimatedCell = `<span class="timetable-delayed">${estimatedStr}</span>`;
                } else {
                    estimatedCell = `<span class="timetable-on-time">—</span>`;
                }
            }

            return `<tr>`
                 + `<td class="timetable-station">${stationName}</td>`
                 + `<td class="timetable-time">${scheduledCell}</td>`
                 + `<td class="timetable-time">${estimatedCell}</td>`
                 + `</tr>`;
        })
        .join('');

    return `
        <div class="timetable-section">
            <table class="timetable-table">
                <thead>
                    <tr>
                        <th colspan="3" class="timetable-header" onclick="toggleTimetable()">
                            時刻表 <span id="timetable-toggle">▼</span>
                        </th>
                    </tr>
                </thead>
            </table>
            <div id="timetable-body" class="timetable-scroll" style="display:none;">
                <table class="timetable-table">
                    <tbody>
                        <tr><th>駅名</th><th>定刻</th><th>見込み</th></tr>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>`;
}

