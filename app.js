const API_KEY = '9e2b40a6f49d3ef5c10ba3f356b12e3c';

// 1. Şehirle Arama
document.getElementById('getWeather').onclick = () => {
    const sehir = document.getElementById('cityInput').value;
    if (sehir) veriGetir(sehir);
    else alert("Şehir yaz aşko!");
};

// 2. Konumla Arama (📍 Butonu)
document.getElementById('getLocation').onclick = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            veriGetirByCoords(latitude, longitude);
        });
    } else {
        alert("Tarayıcın konumu desteklemiyor!");
    }
};

async function veriGetir(sehir) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
    const fUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
    apiCagrisiYap(url, fUrl);
}

async function veriGetirByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`;
    const fUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`;
    apiCagrisiYap(url, fUrl);
}

async function apiCagrisiYap(url, fUrl) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const fRes = await fetch(fUrl);
        const fData = await fRes.json();

        if (data.cod !== 200) throw new Error("Bulunamadı");

        // Ekranı doldur
        document.getElementById('mainIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
        document.getElementById('desc').innerText = data.weather[0].description.toUpperCase();
        
        let tavsiye = data.main.temp < 15 ? "🧣 Sıkı giyin!" : "👕 Rahat takıl!";
        document.getElementById('advice').innerText = tavsiye;

        arkaPlaniGuncelle(data.weather[0].main);
        
        // 5 Günlük Tahmin
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = "";
        for (let i = 7; i < fData.list.length; i += 8) {
            const gun = fData.list[i];
            const tarih = new Date(gun.dt_txt).toLocaleDateString('tr-TR', { weekday: 'short' });
            forecastDiv.innerHTML += `
                <div class="forecast-card">
                    <div>${tarih}</div>
                    <img src="http://openweathermap.org/img/wn/${gun.weather[0].icon}.png" width="30">
                    <strong>${Math.round(gun.main.temp)}°</strong>
                </div>`;
        }
        document.getElementById('result').style.display = "block";
    } catch (e) { alert("Hata oluştu!"); }
}

function arkaPlaniGuncelle(durum) {
    let renk = "";
    switch(durum) {
        case 'Clear': renk = "linear-gradient(135deg, #FFD194, #D1913C)"; break;
        case 'Clouds': renk = "linear-gradient(135deg, #bdc3c7, #2c3e50)"; break;
        case 'Rain': renk = "linear-gradient(135deg, #4b6cb7, #182848)"; break;
        default: renk = "linear-gradient(135deg, #74ebd5, #acb6e5)";
    }
    document.body.style.background = renk;
}