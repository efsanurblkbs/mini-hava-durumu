const API_KEY = '9e2b40a6f49d3ef5c10ba3f356b12e3c';

document.getElementById('getWeather').onclick = async () => {
    const sehir = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!sehir) {
        alert("Aşko şehir ismini unuttun!");
        return;
    }

    try {
        // 1. Anlık Hava Durumu Verisi
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`);
        const data = await res.json();

        if (data.cod !== 200) throw new Error("Şehir bulunamadı");

        // 2. 5 Günlük Tahmin Verisi
        const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`);
        const fData = await fRes.json();

        // Ekranı Güncelle
        document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
        document.getElementById('desc').innerText = data.weather[0].description.toUpperCase();
        
        // Tavsiye Belirle
        let tavsiye = "";
        const temp = data.main.temp;
        if (temp < 10) tavsiye = "❄️ Hava buz! Kalın bir şeyler giy aşko.";
        else if (temp < 20) tavsiye = "⛅ Hafif serin, üzerine bir hırka al.";
        else tavsiye = "☀️ Hava mis! Güneş gözlüğünü unutma.";
        document.getElementById('advice').innerText = tavsiye;

        // Arka Planı Değiştir
        arkaPlaniGuncelle(data.weather[0].main);

        // Tahmin Kartlarını Oluştur
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = ""; 
        for (let i = 7; i < fData.list.length; i += 8) {
            const gun = fData.list[i];
            const tarih = new Date(gun.dt_txt).toLocaleDateString('tr-TR', { weekday: 'short' });
            forecastDiv.innerHTML += `
                <div class="forecast-card">
                    <div>${tarih}</div>
                    <img src="http://openweathermap.org/img/wn/${gun.weather[0].icon}.png" width="35">
                    <strong>${Math.round(gun.main.temp)}°</strong>
                </div>
            `;
        }

        resultDiv.style.display = "block";

    } catch (error) {
        alert("Hata: " + error.message);
    }
};

function arkaPlaniGuncelle(durum) {
    let renk = "";
    switch(durum) {
        case 'Clear': renk = "linear-gradient(135deg, #FFD194, #D1913C)"; break; // Güneşli
        case 'Clouds': renk = "linear-gradient(135deg, #bdc3c7, #2c3e50)"; break; // Bulutlu
        case 'Rain': 
        case 'Drizzle': renk = "linear-gradient(135deg, #4b6cb7, #182848)"; break; // Yağmurlu
        case 'Snow': renk = "linear-gradient(135deg, #E0EAFC, #CFDEF3)"; break; // Karlı
        default: renk = "linear-gradient(135deg, #74ebd5, #acb6e5)";
    }
    document.body.style.background = renk;
}