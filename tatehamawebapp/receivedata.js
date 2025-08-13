// JavaScript source code
async function Getdata() {
    const requestURL = "https://traincrew-multiats-server-passenger.kesigomon.com/api/train"
    //const requestURL = "https://traincrew-multiats-server-passenger-dev.kesigomon.com/api/train"

    const reqest = new Request(requestURL);

    const responce = await fetch(reqest);
	const datastring = await responce.text(); // レスポンスをテキストとして取得

	Location_data = JSON.parse(datastring);
}