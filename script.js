const apiKey = "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";

// Fungsi untuk mengirim pertanyaan ke API dan menangani respons
async function sendQuestionToChatGPT(question) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Model ChatGPT yang akan digunakan
                messages: [{ role: "user", content: question }] // Pertanyaan dari pengguna
            })
        });

        const data = await response.json();
        return data.choices[0].message.content; // Mengembalikan jawaban dari API
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan saat memproses pertanyaan Anda.'; // Mengembalikan pesan error
    }
}

// Tombol kirim
const sendBtn = document.querySelector('.send');
let i = 0;

// Menampilkan hasil ketika menekan tombol
sendBtn.addEventListener('click', async function () {
    const textInpt = document.getElementById('textInpt').value;
    await sendQuestionToChatGPT(textInpt, i);
    i++;
});

// Menampilkan hasil ketika di enter
window.addEventListener('keypress', async function (key) {
    if (key.keyCode === 13) {
        const textInpt = document.getElementById('textInpt').value;
        await sendQuestionToChatGPT(textInpt, i);
        i++;
    }
});

// Fungsi untuk menampilkan input pengguna dan respon dari ChatGPT
async function sendQuestionToChatGPT(textInpt, i) {
    const chatRoom = document.getElementsByClassName('chatRoom')[0];
    const bottonSpace = document.getElementsByClassName('bottonSpace')[0];

    // Menampilkan input pengguna
    newElementUserChat(chatRoom, textInpt);

    // Mengirim pertanyaan pengguna ke ChatGPT dan menampilkan respon
    const response = await sendQuestionToChatGPT(textInpt);
    newElementUserChat(chatRoom, response);

    // Mengatur ulang form input
    formReset();
}

// Fungsi untuk membuat elemen chat baru
function newElementUserChat(chatRoom, textInpt) {
    const popChat = document.createElement('div');
    popChat.setAttribute('class', 'popChat');
    const p = document.createElement('p');
    const txt = document.createTextNode(textInpt);
    p.appendChild(txt);
    popChat.appendChild(p);
    chatRoom.appendChild(popChat);
}

// Fungsi untuk mereset perilaku default dari form input
function formReset() {
    const form = document.getElementsByClassName('blokText')[0];
    form.reset();
}
