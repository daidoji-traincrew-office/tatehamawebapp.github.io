// JavaScript source code

// デフォルト文言
const DEFAULT_INFORMATION_TEXT = `【館浜本線 運転会時間外】`;

// 運行情報テキスト
window.informationtexts = [{ "Type": 1, Content: DEFAULT_INFORMATION_TEXT }];
window.informationindex = -1;

function updateInformationText() {
    const infos = Location_data.OperationInformations;
    if (Array.isArray(infos) && infos.length > 0) {
        // Typeが2以上のものがあるか
        const filtered = infos.filter(info => info.Type >= 2);
        window.informationtexts = filtered.length > 0 ? filtered : infos;
    } else {
        window.informationtexts = [{ "Type": 1, Content: DEFAULT_INFORMATION_TEXT }];
    }
}

function printInformationText() {
    window.informationindex
    const elBottom = document.getElementById('scrolling-text-bottom');
    //表示番号を進める
    window.informationindex++
    //運行情報の数と比較して、インデックスが飛び出たら0に戻す
    if (window.informationtexts.length <= window.informationindex) {
        window.informationindex = 0;
    }
    window.textToShow = (window.informationtexts[window.informationindex].Content.trim()) ? window.informationtexts[window.informationindex].Content : DEFAULT_INFORMATION_TEXT;
    window.textType = window.informationtexts[window.informationindex].Type;
    if (elBottom) {
        elBottom.textContent = textToShow.replace("\n", "");
        //if (textToShow === DEFAULT_INFORMATION_TEXT) {
        //    elBottom.classList.remove('scrolling-text');
        //    elBottom.classList.add('default-info-text');
        //} else {
            elBottom.classList.add('scrolling-text');
            elBottom.classList.remove('default-info-text');
        //}
    }
}

function initInfo() {
    printInformationText();

    // 20秒ごとに再表示
    setInterval(printInformationText, 20000);

    const areaIds = ['scrolling-text-area'];
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    const modalClose = document.getElementById('info-modal-close');

    areaIds.forEach(function (id) {
        const area = document.getElementById(id);
        if (area && modal && modalBody && modalClose) {
            area.addEventListener('click', function () {
                // モーダル表示時も最新内容に
                modalBody.innerHTML = `
                    <h2>${window.textType == 0 ? 'PR':'運行情報'}</h2>
                    <div class="info-modal-message">${textToShow.replace(/\r\n/g, '<br/>').replace(/／/g, '') }</div>
                `;
                modal.style.display = 'flex';
            });
        }
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
}