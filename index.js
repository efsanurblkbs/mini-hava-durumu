import readline from 'readline';
import fs from 'fs'; // 1. Dosya sistemi modülünü çağırdık

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Log tutma fonksiyonu (Mala anlatır gibi: Bu fonksiyon dosyaya yazı yazar)
const logKaydet = (sehir, derece) => {
    const tarih = new Date().toLocaleString(); // O anki tarih ve saati al
    const mesaj = `[${tarih}] Şehir: ${sehir}, Sıcaklık: ${derece}°C\n`;

    // 'history.txt' dosyasına ekleme yapıyoruz (appendFile)
    fs.appendFile('history.txt', mesaj, (err) => {
        if (err) console.log("Hata: Log yazılamadı!");
    });
};

console.log("--- 🌦️  Hava Durumu Kayıt Sistemi ---");

const tavsiyeVer = () => {
    rl.question('Lütfen bir şehir adı gir (Çıkış için q): ', (sehir) => {
        
        if (sehir.toLowerCase() === 'q') {
            console.log("Görüşürüz dostum! Kayıtlar history.txt dosyasına saklandı.");
            rl.close();
            return;
        }

        const sicaklik = Math.floor(Math.random() * 40);
        console.log(`\n🌡️  ${sehir} için sıcaklık: ${sicaklik}°C`);

        // Loglama fonksiyonunu burada çağırıyoruz
        logKaydet(sehir, sicaklik);

        console.log("✅ İşlem kaydedildi. Başka bir şehir?\n");
        tavsiyeVer();
    });
};

tavsiyeVer();