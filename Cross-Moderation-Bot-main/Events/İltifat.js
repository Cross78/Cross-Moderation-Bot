const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
let iltifatSayi = 0;
let iltifatlar = [
    "Yaşanılacak en güzel mevsim sensin.",
    "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
    "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
    "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
    "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
    "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
    "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
    "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
    "Bir gamzen var sanki cennette bir çukur.",
    "Gecemi aydınlatan yıldızımsın.",
    "Ponçik burnundan ısırırım seni",
    "Bu dünyanın 8. harikası olma ihtimalin?",
    "fıstık naber?",
    "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
    "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
    "Müsaitsen aklım bu gece sende kalacak.",
    "Gemim olsa ne yazar liman sen olmadıktan sonra...",
    "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
    "Sabahları görmek istediğim ilk şey sensin.",
    "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
    "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
    "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
    "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
    "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
    "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
    "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
    "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
    "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
    "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
    "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
    "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi..."
];
module.exports = async message => {
    let client = message.client;
    if (message.author.bot) return;
    if (message.content.startsWith(ayar.bot.botPrefix)) return;
    if (message.channel.id != ayar.channels.genelChat) return;
    let iltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];

    iltifatSayi++;
    if (iltifatSayi >= 75) {
        iltifatSayi = 0;
        message.reply(iltifat);

    };
};