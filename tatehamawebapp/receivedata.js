

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
        Location_data = { "ServerMode": true, "TimeOffset": -10, "TrackCircuitData": [{ "Last": "1285C", "Name": "TH65_12LT", "Lock": false, "On": true }, { "Last": "1267", "Name": "TH67_5LT", "Lock": false, "On": true }], "TrainInfos": { "1285C": { "Name": "1285C", "CarStates": [{ "Ampare": 0, "BC_Press": 282.96368, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": true }, { "Ampare": 0, "BC_Press": 279.30844, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": false }, { "Ampare": 0, "BC_Press": 285.50992, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": true, "HasPantograph": true }, { "Ampare": 0, "BC_Press": 279.30844, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": false }, { "Ampare": 0, "BC_Press": 279.31955, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": false }, { "Ampare": 0, "BC_Press": 286.41522, "CarModel": "4000R", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": true }], "TrainClass": 3, "FromStation": "TH65", "DestinationStation": "TH76", "Delay": 0, "Timetable": [{ "StationId": "TH65", "TrackNumber": "6番線", "DepartureTime": "12:22:00", "ArrivalTime": null }, { "StationId": "TH66S", "TrackNumber": "1番線", "DepartureTime": "12:22:40", "ArrivalTime": null }, { "StationId": "TH66", "TrackNumber": "1番線", "DepartureTime": "12:24:00", "ArrivalTime": "12:23:40" }, { "StationId": "TH67", "TrackNumber": "3番線", "DepartureTime": "12:26:15", "ArrivalTime": "12:25:45" }, { "StationId": "TH68", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": null }, { "StationId": "TH69", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": null }, { "StationId": "TH70", "TrackNumber": "2番線", "DepartureTime": "12:29:30", "ArrivalTime": "12:29:00" }, { "StationId": "TH71", "TrackNumber": "2番線", "DepartureTime": "12:30:45", "ArrivalTime": null }, { "StationId": "TH72", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": null }, { "StationId": "TH73", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": null }, { "StationId": "TH74", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": null }, { "StationId": "TH75", "TrackNumber": "2番線", "DepartureTime": "12:35:20", "ArrivalTime": "12:34:50" }, { "StationId": "TH76", "TrackNumber": "2番線", "DepartureTime": null, "ArrivalTime": "12:38:10" }] }, "1267": { "Name": "1267", "CarStates": [{ "Ampare": 0, "BC_Press": 461.57462, "CarModel": "5300", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": false }, { "Ampare": 0, "BC_Press": 440, "CarModel": "5300", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": true }, { "Ampare": 0, "BC_Press": 440, "CarModel": "5300", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": false }, { "Ampare": 0, "BC_Press": 464.55, "CarModel": "5300", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": false }], "TrainClass": 1, "FromStation": "TH67", "DestinationStation": "TH76", "Delay": 0, "Timetable": [{ "StationId": "TH67", "TrackNumber": "4番線", "DepartureTime": "12:34:50", "ArrivalTime": null }, { "StationId": "TH68", "TrackNumber": "1番線", "DepartureTime": "12:36:40", "ArrivalTime": "12:36:20" }, { "StationId": "TH69", "TrackNumber": "1番線", "DepartureTime": "12:38:30", "ArrivalTime": "12:38:10" }, { "StationId": "TH70", "TrackNumber": "2番線", "DepartureTime": "12:40:25", "ArrivalTime": "12:39:55" }, { "StationId": "TH71", "TrackNumber": "3番線", "DepartureTime": "12:44:25", "ArrivalTime": "12:42:20" }, { "StationId": "TH72", "TrackNumber": "1番線", "DepartureTime": "12:46:50", "ArrivalTime": "12:46:30" }, { "StationId": "TH73", "TrackNumber": "1番線", "DepartureTime": "12:49:05", "ArrivalTime": "12:48:45" }, { "StationId": "TH74", "TrackNumber": "1番線", "DepartureTime": "12:51:00", "ArrivalTime": "12:50:40" }, { "StationId": "TH75", "TrackNumber": "2番線", "DepartureTime": "12:52:55", "ArrivalTime": "12:52:25" }, { "StationId": "TH76", "TrackNumber": "3番線", "DepartureTime": null, "ArrivalTime": "12:55:55" }] } }, "OperationInformations": [] }
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
