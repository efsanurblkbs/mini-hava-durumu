import readline from 'readline';
import fs from 'fs';
import axios from 'axios'; // Yeni yardımcımız

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// !!! BURAYA KENDİ API KEY'İNİ YAPIŞTIR !!!
const API_KEY = '9e2b40a6f49d3ef5c10ba3f356b12e3c'; 

const logKaydet = (sehir, derece) => {
    const tarih = new Date().toLocaleString();
    const mesaj = `[${tarih}] Şehir: ${sehir}, Gerçek Sıcaklık: ${derece}°C\n`;
    fs.appendFile('history.txt', mesaj, () => {});
};

const havaDurumuGetir = async (sehir) => {
    try {
        // İnternete gidip veriyi istediğimiz an:
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
        const cevap = await axios.get(url);
        
        const derece = cevap.data.main.temp;
        const durum = cevap.data.weather[0].description;

        console.log(`\n🌍 ${sehir.toUpperCase()} İÇİN DURUM:`);
        console.log(`🌡️  Sıcaklık: ${derece}°C`);
        console.log(`☁️  Gökyüzü: ${durum}`);

        // Tavsiye Motoru
        if (derece < 15) console.log("🧣 Tavsiye: Gerçekten soğuk, sıkı giyin!");
        else console.log("👕 Tavsiye: Hava güzel, tadını çıkar.");

        logKaydet(sehir, derece);

    } catch (error) {
        // GEREKSİNİM 4: Hata Yönetimi (Error Handling)
        console.log("❌ Hata: Şehir bulunamadı veya internet bağlantısı yok.");
    } finally {
        soruSor(); // İşlem bitince tekrar sor
    }
};

const soruSor = () => {
    rl.question('\nHangi şehri öğrenmek istersin? (Çıkış: q): ', (cevap) => {
        if (cevap.toLowerCase() === 'q') {
            console.log("Görüşürüz dostum!");
            rl.close();
        } else {
            havaDurumuGetir(cevap);
        }
    });
};

console.log("--- 📡 CANLI HAVA DURUMU SİSTEMİ BAŞLADI ---");
soruSor();