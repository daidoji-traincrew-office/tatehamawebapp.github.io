

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
        Location_data = { "ServerMode": true, "TimeOffset": 0, "TrackCircuitData": [{ "Last": "1260", "Name": "TH71_1RAT", "Lock": false, "On": true }], "TrainInfos": { "1260": { "Name": "1260", "CarStates": [{ "Ampare": 0, "BC_Press": 470.08493, "CarModel": "5300", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": false, "OccupancyRate": 54.28571 }, { "Ampare": 0, "BC_Press": 440, "CarModel": "5300", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": false, "OccupancyRate": 48.78049 }, { "Ampare": 0, "BC_Press": 440, "CarModel": "5300", "DoorClose": false, "HasConductorCab": false, "HasDriverCab": false, "HasMotor": false, "HasPantograph": true, "OccupancyRate": 34.14634 }, { "Ampare": 0, "BC_Press": 463.74088, "CarModel": "5300", "DoorClose": false, "HasConductorCab": true, "HasDriverCab": true, "HasMotor": true, "HasPantograph": false, "OccupancyRate": 42.85714 }], "TrainClass": 1, "FromStation": "TH76", "DestinationStation": "TH67", "Delay": 0, "Timetable": [{ "StationId": "TH76", "TrackNumber": "3番線", "DepartureTime": "12:13:00", "ArrivalTime": null }, { "StationId": "TH75", "TrackNumber": "1番線", "DepartureTime": "12:15:45", "ArrivalTime": "12:15:15" }, { "StationId": "TH74", "TrackNumber": "0番線", "DepartureTime": "12:17:25", "ArrivalTime": "12:17:05" }, { "StationId": "TH73", "TrackNumber": "0番線", "DepartureTime": "12:19:15", "ArrivalTime": "12:18:55" }, { "StationId": "TH72", "TrackNumber": "0番線", "DepartureTime": "12:21:30", "ArrivalTime": "12:21:10" }, { "StationId": "TH71", "TrackNumber": "1番線", "DepartureTime": "12:23:50", "ArrivalTime": "12:23:25" }, { "StationId": "TH70", "TrackNumber": "1番線", "DepartureTime": "12:26:00", "ArrivalTime": "12:25:30" }, { "StationId": "TH69", "TrackNumber": "0番線", "DepartureTime": "12:27:45", "ArrivalTime": "12:27:25" }, { "StationId": "TH68", "TrackNumber": "0番線", "DepartureTime": "12:29:35", "ArrivalTime": "12:29:15" }, { "StationId": "TH67", "TrackNumber": "1番線", "DepartureTime": null, "ArrivalTime": "12:31:10" }] } }, "OperationInformations": [] }
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
