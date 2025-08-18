// ユーザーIDとパスワードの組み合わせをオブジェクトで管理
const users = {
    "traincrew": "tatehama2021",
    "mizotuki": "Gokuraku@Temple",
    // 必要なだけ追加
};

// エラーメッセージ候補
const errorMessages = [
    "ユーザー名またはパスワードが違います",
    "違うよ？",
    "ユーザー名またはパスワードが違います",
    "ユーザー名またはパスワードが違います",
    "ユーザー名またはパスワードが違います",
    "ユーザー名またはパスワードが違います"
];


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pw-form').onsubmit = function (e) {
        e.preventDefault();
        const user = document.getElementById('user-input').value;
        const pw = document.getElementById('pw-input').value;
        if (users[user] && users[user] === pw) {
            const urlParams = new URLSearchParams(window.location.search);
            const gbParam = urlParams.get('gb');
            let redirectUrl = "tatehama.html";
            if (gbParam === "true") {
                redirectUrl += "?gb=true";
            }
            redirectUrl += "#TH65";
            window.location.href = redirectUrl;
        } else {
            const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            document.getElementById('pw-error').textContent = msg;
            document.getElementById('pw-error').style.display = "block";
        }
    };
});