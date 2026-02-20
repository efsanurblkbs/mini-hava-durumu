import readline from 'readline';
import fs from 'fs';
import axios from 'axios';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// !!! ANAHTARINI BURAYA YAPIŞTIR !!!
const API_KEY = '9e2b40a6f49d3ef5c10ba3f356b12e3c'; 

const logKaydet = (sehir, derece) => {
    const tarih = new Date().toLocaleString();
    const mesaj = `[${tarih}] Şehir: ${sehir}, Sıcaklık: ${derece}°C\n`;
    fs.appendFile('history.txt', mesaj, () => {});
};

const havaDurumuGetir = async (sehir) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
        const cevap = await axios.get(url);
        
        const derece = cevap.data.main.temp;
        const durum = cevap.data.weather[0].description;

        console.log(`\n🌍 Şehir: ${sehir.toUpperCase()}`);
        console.log(`🌡️  Sıcaklık: ${derece}°C`);
        console.log(`☁️  Durum: ${durum}`);

        if (derece < 15) console.log("🧣 Tavsiye: Hava soğuk, sıkı giyin!");
        else if (derece >= 15 && derece < 25) console.log("👕 Tavsiye: Hava harika, bir yürüyüş yap!");
        else console.log("🍦 Tavsiye: Hava çok sıcak, dondurma ye!");

        logKaydet(sehir, derece);

    } catch (error) {
        if (error.response) {
            // API'den gelen hata (Şehir yoksa veya anahtar hatalıysa)
            console.log(`\n❌ API Hatası: ${error.response.data.message}`);
        } else {
            // İnternet yoksa veya başka bir teknik hata
            console.log("\n❌ Bağlantı Hatası: İnternetini kontrol et.");
        }
    } finally {
        soruSor();
    }
};

const soruSor = () => {
    rl.question('\nŞehir adı gir (Çıkış: q): ', (cevap) => {
        if (cevap.toLowerCase() === 'q') {
            console.log("Görüşürüz dostum! 👋");
            rl.close();
        } else if (cevap.trim() === "") {
            console.log("Lütfen boş bırakma.");
            soruSor();
        } else {
            havaDurumuGetir(cevap);
        }
    });
};

console.log("--- 📡 CANLI HAVA DURUMU SİSTEMİ ---");
soruSor();