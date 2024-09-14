const getData = async (route, data) => {

    const queryString = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    const url = `http://localhost:8000/${route}?` + queryString;

    try{
        const response = await fetch(url)
        const json = await response.json()
        return json
    }
    catch{

    }
}


module.exports = getData