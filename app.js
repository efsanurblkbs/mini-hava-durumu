const API_KEY = '9e2b40a6f49d3ef5c10ba3f356b12e3c';

document.getElementById('getWeather').onclick = async () => {
    const sehir = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!sehir) {
        alert("Boş bırakma aşko, bir şehir yaz!");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
        const cevap = await fetch(url);
        const veri = await cevap.json();

        if (veri.cod !== 200) {
            alert("Şehir bulunamadı, doğru yazdığına emin misin?");
            return;
        }

        // 1. Dereceyi yazdır
        document.getElementById('temp').innerText = Math.round(veri.main.temp) + "°C";
        
        // 2. Durumu yazdır (Güneşli, Parçalı Bulutlu vb.)
        document.getElementById('desc').innerText = veri.weather[0].description.toUpperCase();
        
        // 3. Tavsiyeyi güncelle
        let tavsiye = "";
        const derece = veri.main.temp;
        if (derece < 15) tavsiye = "🧣 Hava buz gibi, sıkı giyin tatlım!";
        else if (derece < 25) tavsiye = "👕 Tam gezmelik hava, tadını çıkar!";
        else tavsiye = "🍦 Yanıyoruz! Hemen bir dondurma al.";

        document.getElementById('advice').innerText = tavsiye;
        
        // 4. SONUÇ PANELİNİ GÖRÜNÜR YAP (En önemli kısım burası!)
        resultDiv.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("İnternetinde veya API'de bir sorun var!");
    }
};