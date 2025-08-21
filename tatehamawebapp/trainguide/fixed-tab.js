function updateTime() {
    const now = new Date();
    now.setHours(now.getHours() - 10); // 10時間前に調整
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const timeElem = document.getElementById('fixed-time');
    if (timeElem) {
        timeElem.textContent = `最終更新 ${hh}:${mm}(TST) 現在`;
    }
}