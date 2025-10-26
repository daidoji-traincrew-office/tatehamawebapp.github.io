// JavaScript source code
async function Getdata() {
    const requestURL_P = "https://traincrew-multiats-server-passenger.kesigomon.com/api/train"
    const requestURL_D = "https://traincrew-multiats-server-passenger-dev.kesigomon.com/api/train"

    // Prod
    const reqest_P = new Request(requestURL_P);
    const responce_P = await fetch(reqest_P);
    const datastring_P = await responce_P.text();
    Location_data_P = JSON.parse(datastring_P);

    // Dev
    const reqest_D = new Request(requestURL_D);
    const responce_D = await fetch(reqest_D);
    const datastring_D = await responce_D.text();
    Location_data_D = JSON.parse(datastring_D);

    if (Location_data_D.ServerMode) {
        Location_data = Location_data_D;
    }
    else if (Location_data_P.ServerMode) {
        Location_data = Location_data_P;
    }
}