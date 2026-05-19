

// グローバル変数として初期化
var Location_data = {
    "ServerMode": false,
    "TrackCircuitData": [],
    "TrainInfos": {},
    "OperationInformations": []
};


const DEBUG_MODE = false;

async function Getdata() {
    if (DEBUG_MODE) {
        Location_data = {"ServerMode":true,"TrackCircuitData":[{"Last":"1585C","Name":"TH67_4LT","Lock":false,"On":true},{"Last":"1298C","Name":"TH67_1RAT","Lock":false,"On":true}],"TrainInfos":{"1585C":{"Name":"1585C","CarStates":[{"Ampare":0,"BC_Press":469.47952,"CarModel":"4300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":true,"HasPantograph":true},{"Ampare":0,"BC_Press":440,"CarModel":"4300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":false,"HasPantograph":false},{"Ampare":0,"BC_Press":464.04913,"CarModel":"5300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":true,"HasPantograph":true},{"Ampare":0,"BC_Press":440,"CarModel":"5300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":false,"HasPantograph":false},{"Ampare":0,"BC_Press":463.27316,"CarModel":"5300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":true,"HasPantograph":true},{"Ampare":0,"BC_Press":440,"CarModel":"5300","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":false,"HasPantograph":false}],"TrainClass":3,"FromStation":"TH65","DestinationStation":"TH76","Delay":4},"1298C":{"Name":"1298C","CarStates":[{"Ampare":0,"BC_Press":87.81889,"CarModel":"3020","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":true,"HasPantograph":true},{"Ampare":0,"BC_Press":86.870514,"CarModel":"3020","DoorClose":false,"HasConductorCab":false,"HasDriverCab":false,"HasMotor":true,"HasPantograph":false},{"Ampare":0,"BC_Press":86.27372,"CarModel":"3020","DoorClose":false,"HasConductorCab":false,"HasDriverCab":false,"HasMotor":true,"HasPantograph":false},{"Ampare":0,"BC_Press":88.2832,"CarModel":"3020","DoorClose":false,"HasConductorCab":false,"HasDriverCab":false,"HasMotor":true,"HasPantograph":true},{"Ampare":0,"BC_Press":86.72133,"CarModel":"3020","DoorClose":false,"HasConductorCab":false,"HasDriverCab":false,"HasMotor":true,"HasPantograph":false},{"Ampare":0,"BC_Press":87.81889,"CarModel":"3020","DoorClose":false,"HasConductorCab":true,"HasDriverCab":true,"HasMotor":true,"HasPantograph":true}],"TrainClass":3,"FromStation":"TH76","DestinationStation":"TH65","Delay":8}},"OperationInformations":[]};
        return;
    }

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
                { "Id": 0, "Content": "【TRAIN CREW　好評発売中】\r\n列車運転ゲーム「TRAIN CREW」\r\n運転士はもちろん、シミュレーションゲームでは珍しい車掌もプレイ可能。\r\nSteamより、1980円で発売中。\r\n詳しくは「TRAIN CREW」で検索！", "Type": 0, "StartTime": "1970-01-01T00:00:00", "EndTime": "4000-12-31T00:00:00" },
                { "Id": 1, "Content": "【館浜本線 運転会時間外】\r\n館浜本線は、現在運転会時間外のため、運転を見合わせています。", "Type": 1, "StartTime": "1970-01-01T00:00:00", "EndTime": "4000-12-31T00:00:00" }
            ]
        }
    }
}
