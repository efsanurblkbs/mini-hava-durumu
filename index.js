import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- 🌦️  Hava Durumu Tavsiye Uygulaması ---");

const tavsiyeVer = () => {
    rl.question('Lütfen bir şehir adı gir (Çıkış için q): ', (sehir) => {
        
        if (sehir.toLowerCase() === 'q') {
            console.log("Görüşürüz, kendine iyi bak! 👋");
            rl.close();
            return;
        }

        // Şimdilik 0 ile 40 derece arası rastgele bir sıcaklık uyduruyoruz
        const sicaklik = Math.floor(Math.random() * 40);
        
        console.log(`\n📍 Şehir: ${sehir}`);
        console.log(`🌡️  Sıcaklık: ${sicaklik}°C`);

        // TAVSİYE MANTIĞI
        if (sicaklik < 10) {
            console.log("🧣 Tavsiye: Hava buz gibi! Kalın bir şeyler giymeden çıkma.");
        } else if (sicaklik >= 10 && sicaklik < 20) {
            console.log("🧥 Tavsiye: Hafif serin bir hava var, üzerine bir hırka al.");
        } else if (sicaklik >= 20 && sicaklik < 30) {
            console.log("👕 Tavsiye: Hava mis! Tam tişörtlük bir gün.");
        } else {
            console.log("🍦 Tavsiye: Yanıyoruz! Gölge bir yer bul ve bol su iç.");
        }

        console.log("-------------------------------------------\n");
        
        // Tekrar sor ki uygulama hemen kapanmasın
        tavsiyeVer();
    });
};

tavsiyeVer();