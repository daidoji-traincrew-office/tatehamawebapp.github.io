// JavaScript source code

// デフォルト文言
const DEFAULT_INFORMATION_TEXT = `【館浜本線 運転会時間外】\r\n館浜本線は、現在運転会時間外のため、運転を見合わせています。`;

// 運行情報テキスト
window.informationtexts = [{ "Type": 1, Content: DEFAULT_INFORMATION_TEXT }];
window.informationindex = -1;

// スクロール速度（ピクセル/秒）を外部から変更可能に
window.scrollSpeedDefault = 150; // デフォルト値
window.scrollSpeed = window.scrollSpeedDefault; // デフォルト値

function updateInformationText() {
    const infos = Location_data.OperationInformations;
    if (Array.isArray(infos) && infos.length > 0) {
        // Typeが2以上のものがあるか
        const filtered = infos.filter(info => info.Type >= 2);
        window.informationtexts = filtered.length > 0 ? filtered : infos;
    } else {
        window.informationtexts = [{ "Type": 1, Content: DEFAULT_INFORMATION_TEXT }];
    }

    // スクロール速度を設定
    const length = window.informationtexts.length;
    if (length <= 2) {
        window.scrollSpeed = window.scrollSpeedDefault; // 最低速度
    } else if (length >= 12) {
        window.scrollSpeed = window.scrollSpeedDefault * 2; // 最大速度
    } else {
        // 線形補間で速度を計算
        window.scrollSpeed = window.scrollSpeedDefault + ((length - 2) / (12 - 2)) * (window.scrollSpeedDefault * 2 - window.scrollSpeedDefault);
    }
}

// スクロール制御用関数（速度制御版）
function scrollInformationText() {
    const elBottom = document.getElementById('scrolling-text-bottom');
    if (!elBottom) return;

    const scrollArea = document.getElementById('scrolling-text-area');
    if (!scrollArea) return;

    const startPosition = 0; // 初期位置（右端）
    const endPosition = -elBottom.offsetWidth; // 終了位置（左端）
    const totalDistance = startPosition - endPosition; // スクロール距離
    const scrollDuration = totalDistance / window.scrollSpeed * 1000; // スクロール時間（ミリ秒）

    // 初期位置を設定
    elBottom.style.transform = `translateX(${startPosition}px)`;

    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = elapsedTime / scrollDuration;

        if (progress < 1) {
            // スクロール位置を更新
            const translateX = startPosition - (totalDistance * progress);
            elBottom.style.transform = `translateX(${translateX}px)`;
            requestAnimationFrame(animateScroll);
        } else {
            // スクロール終了時に次の内容をセット
            elBottom.style.transform = `translateX(${startPosition}px)`;
            printInformationText();
            scrollInformationText(); // 次のスクロールを開始
        }
    }

    requestAnimationFrame(animateScroll);
}

// 運行情報の内容を切り替える関数
function printInformationText() {
    const elBottom = document.getElementById('scrolling-text-bottom');
    if (!elBottom) return;

    // 表示番号を進める
    window.informationindex++;
    if (window.informationtexts.length <= window.informationindex) {
        window.informationindex = 0;
    }

    // 次に表示するテキストを取得
    window.textType = window.informationtexts[window.informationindex]?.Type || 1;
    window.textToShow = window.informationtexts[window.informationindex]?.Content?.trim() || DEFAULT_INFORMATION_TEXT;
    elBottom.textContent = textToShow.replace(/\n/g, ""); // 改行を削除
}

// 初期化関数
function initInfo() {
    updateInformationText(); // 初回の運行情報をセット
    printInformationText(); // 初回のテキストを表示
    scrollInformationText(); // スクロールを開始

    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    const modalClose = document.getElementById('info-modal-close');

    const area = document.getElementById('scrolling-text-area');
    if (area && modal && modalBody && modalClose) {
        area.addEventListener('click', function () {
            modalBody.innerHTML = `
                <h2>${window.textType == 0 ? 'PR' : '運行情報'}</h2>
                <div class="info-modal-message">${textToShow.replace(/\r\n/g, '<br/>').replace(/／/g, '') }</div>
            `;
            modal.style.display = 'flex';
        });

        modalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', initInfo);