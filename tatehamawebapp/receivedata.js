// JavaScript source code
async function Getdata() {
    const requestURL_P = "https://traincrew-multiats-server-passenger.kesigomon.com/api/train"
    const requestURL_D = "https://traincrew-multiats-server-passenger-dev.kesigomon.com/api/train"

    let Location_data_P = null;
    let Location_data_D = null;

    // Prod
    try {
        const reqest_P = new Request(requestURL_P);
        const responce_P = await fetch(reqest_P);
        if (responce_P.ok) {
            const datastring_P = await responce_P.text();
            Location_data_P = JSON.parse(datastring_P);
        }
    } catch (e) {
        console.warn("Prodサーバー取得失敗:", e);
    }

    // Dev
    try {
        const reqest_D = new Request(requestURL_D);
        const responce_D = await fetch(reqest_D);
        if (responce_D.ok) {
            const datastring_D = await responce_D.text();
            Location_data_D = JSON.parse(datastring_D);
        }
    } catch (e) {
        console.warn("Devサーバー取得失敗:", e);
    }

    if (Location_data_P && Location_data_P.ServerMode) {
        Location_data = Location_data_P;
    }
    else if (Location_data_D && Location_data_D.ServerMode) {
        Location_data = Location_data_D;
    }
    else {
        Location_data = {
            "ServerMode": true,
            "TrackCircuitData": [],
            "TrainInfos": {},
            "OperationInformations": [
                { "Id": 0, "Content": "【TRAIN CREW　好評発売中】\r\n列車運転ゲーム「TRAIN CREW」\r\n運転士はもちろん、シミュレーションゲームでは珍しい車掌もプレイ可能。\r\nSteamより、1980円で発売中。\r\n詳しくは「TRAIN CREW」で検索！", "Type": 4, "StartTime": "1970-01-01T00:00:00", "EndTime": "4000-12-31T00:00:00" },
                { "Id": 1, "Content": "【館浜本線 運転会時間外】\r\n館浜本線は、現在運転会時間外のため、運転を見合わせています。", "Type": 3, "StartTime": "1970-01-01T00:00:00", "EndTime": "4000-12-31T00:00:00" }
            ]
        }
    }
}
