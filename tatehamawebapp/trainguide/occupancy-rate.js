// occupancy-rate.js
// 乗車率表示HTMLを生成する

/**
 * 乗車率情報を返す
 * - 1両ごとに表示する場合: { type: 'perCar', icons: ['<img...>', ...] }
 * - まとめて1つ表示する場合: { type: 'single', html: '<span>...</span>' }
 * - 表示なし: { type: 'none' }
 *
 * @param {object} train - Location_data.TrainInfos の1列車分オブジェクト
 * @returns {{ type: string, icons?: string[], html?: string }}
 */
function buildOccupancyRateIconList(train, isUp = false) {
    if (!train || !Array.isArray(train.CarStates) || train.CarStates.length === 0) {
        return { type: 'none' };
    }

    // car-icons.js と同様に上り列車のときは反転する
    const carStates = isUp ? [...train.CarStates].reverse() : [...train.CarStates];
    const imagePath = 'occupancyrate';

    // train-detail-modal.js と同じ種別判定ロジック
    let resolvedType = typeof TypeString === 'function' ? TypeString(train.Name) : 0;
    if (1 <= train.TrainClass && train.TrainClass <= 23) {
        resolvedType = train.TrainClass;
    }
    const kindStr = typeof getTrainTypeByClass === 'function'
        ? getTrainTypeByClass(resolvedType)
        : '';

    // === 判定1: 対象外車両モデル (3000・3020・4000・4300・4600) ===


    // === 判定2: データなし種別 (臨時・試運転・回送・団体) ===
    const noDataKinds = ['臨時', '試運転', '回送', '団体'];
    if (noDataKinds.includes(kindStr)) {
        return {
            type: 'single',
            html: `<span class="occupancy-rate-nodata">データなし</span>`
        };
    }

    // === 判定3: 特急系 ===
    const limitedExpressKinds = ['特急', '臨時特急'];
    if (limitedExpressKinds.includes(kindStr)) {
        const carCount = carStates.length;
        const totalRate = carStates.reduce((sum, car) => sum + (Number(car.OccupancyRate) || 0), 0);
        const overallPercent = totalRate / carCount;

        let symbol, label, cls;
        if (overallPercent <= 80) {
            symbol = '〇'; label = '空席あり';  cls = 'occupancy-rate-express--free';
        } else if (overallPercent <= 99) {
            symbol = '△'; label = '空席わずか'; cls = 'occupancy-rate-express--few';
        } else {
            symbol = '×'; label = '空席なし';   cls = 'occupancy-rate-express--full';
        }

        return {
            type: 'single',
            html: `<span class="occupancy-rate-express ${cls}">${symbol} ${label}</span>`
        };
    }

    // === 判定4: それ以外 → 各車両ごとに画像を返す ===
    const excludedModels = ['3000', '3020', '4000', '4300', '4600', '3300V'];
    const icons = carStates.map(car => {
        // 対象外車両モデルは0.pngを表示
        if (excludedModels.includes(String(car.CarModel ?? ''))) {
            return `<img src="${imagePath}/0.png" class="occupancy-rate-img" alt="乗車率データなし">`;
        }

        const r = Number(car.OccupancyRate) || 0;
        let fileNum;
        if      (r <=  49) fileNum = 1;
        else if (r <=  79) fileNum = 2;
        else if (r <= 89) fileNum = 3;
        else if (r <= 109) fileNum = 4;
        else if (r <= 129) fileNum = 5;
        else               fileNum = 6;

        return `<img src="${imagePath}/${fileNum}.png" class="occupancy-rate-img" alt="乗車率${Math.round(r)}%">`;
    });

    return { type: 'perCar', icons };
}