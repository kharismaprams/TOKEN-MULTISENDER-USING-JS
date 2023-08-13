# Multi-Sender Token ERC20

Dokumentasi ini memberikan panduan langkah demi langkah untuk mengirim token ERC20 kepada beberapa alamat menggunakan skrip yang saya contohkan di Jaringan Mode Testnet. Pastikan Anda memahami konsep yang dibahas dan berhati-hati saat berurusan dengan transaksi kripto.

## Persiapan Awal

1. Pastikan Anda memiliki akses ke alamat pengirim yang memiliki saldo token yang cukup untuk dikirimkan.
2. Pastikan Anda memahami konsep dasar tentang alamat Ethereum, kontrak token, ABI (Application Binary Interface), dan kunci pribadi (private key).

## Langkah 1: Instalasi dan Konfigurasi

1. Instal Node.js: Pastikan Anda telah menginstal Node.js di komputer Anda. Anda dapat mengunduh dan menginstalnya dari situs resmi Node.js: https://nodejs.org/
2. Buat Direktori Baru: Buat direktori baru di mana Anda akan menyimpan skrip ini.
3. Unduh Web3.js dan Ethereumjs-util: Anda perlu menginstal library web3 dan ethereumjs-util. Buka terminal atau command prompt, arahkan ke direktori tempat Anda menyimpan skrip ini, lalu jalankan perintah berikut:
  `npm install web3 ethereumjs-util`

Jika Anda sudah menginstal web3 dan telah memasukkan baris const Web3 = require('web3'); di awal skrip Anda, tetapi masih mengalami kesalahan, maka masalah ini bisa berkaitan dengan versi web3 yang Anda gunakan.

Pastikan Anda menggunakan versi web3 yang kompatibel dengan kode Anda. Terkadang, perubahan dalam versi pustaka dapat memengaruhi cara kode berfungsi. Cobalah untuk menginstal versi web3 yang lebih stabil. Misalnya:
`npm install web3@1.5.3`


## Langkah 2: Menyiapkan Skrip

1. Buat file baru dengan nama `transfer.js` dalam direktori proyek Anda.
2. Salin skrip di bawah ini dan tempelkan ke dalam file `transfer.js`:


```javascript
const Web3 = require('web3'); // Created by @KharismaPramS

const network = {
    name: 'Mode Testnet', // Masukkan nama chain anda
    url: 'https://sepolia.mode.network/', // Masukkan URL chain anda
    chainId: 919, // Masukkan ID chain anda
    tokenAddress: 'MASUKAN SC TOKEN ANDA', // Alamat smart contract token anda
    tokenAbi: [], // Masukkan ABI ERC20 anda di sini
    privateKey: 'MASUKAN PRIVATE KET WALLET ANDA' // Private Key Wallet anda
};

async function sendTokens() {
    const web3 = new Web3(network.url);
    const tokenContract = new web3.eth.Contract(network.tokenAbi, network.tokenAddress);

    const account = web3.eth.accounts.privateKeyToAccount(network.privateKey);
    const nonce = await web3.eth.getTransactionCount(account.address);
    
    const recipients = ['MASUKAN ADDRESS PENERIMA', 'MASUKAN ADDRESS PENERIMA']; // Alamat-alamat tujuan
    const amounts = ['MASUKAN JUMLAH TOKEN', 'MASUKAN JUMLAH TOKEN'];
 // Jumlah token yang akan dikirim ke setiap alamat

    for (let i = 0; i < recipients.length; i++) {
        const txData = tokenContract.methods.transfer(recipients[i], amounts[i]).encodeABI();
        const tx = {
            from: account.address,
            to: network.tokenAddress,
            nonce: nonce + i,
            gasPrice: web3.utils.toWei('10', 'gwei'), // Ganti sesuai kebutuhan
            gasLimit: 60000, // Ganti sesuai kebutuhan
            value: '0x0',
            data: txData,
            chainId: network.chainId
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, network.privateKey);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log(`Token sent to ${recipients[i]} on ${network.name}: ${amounts[i]}`);
    }
}

sendTokens();

```
Jika token Anda memiliki 18 desimal (decimals), maka jumlah yang Anda kirimkan dalam kode harus dalam satuan Wei. Wei adalah satuan terkecil dalam Ethereum, sedangkan 1 Token = 1e18 Wei.

Untuk menghindari masalah overflow karena JavaScript memiliki batasan pada representasi angka floating-point (poin mengambang), Anda dapat menggunakan notasi angka bulat biasa. Gunakan kode berikut:
```javascript
const amounts = ['NOMINAL TOKEN', 'NOMINAL TOKEN'];
```

Contohnya Anda ingin mengirim 2000 Token pada dua alamat yang anda masukan, maka rubah kode menjadi:
```javascript
const amounts = ['2000000000000000000000', '2000000000000000000000'];
```

## Langkah 3: Menjalankan Skrip

1. Ganti nilai-nilai yang sesuai seperti alamat kontrak token, ABI, alamat pengirim, alamat-alamat tujuan, dan nilai token yang akan dikirim dalam file transfer.js. 
2. Buka terminal dan navigasi ke direktori proyek di mana file transfer.js disimpan.
3. Jalankan skrip dengan perintah berikut:

`node transfer.js`

*Karena disini saya mengujinya di jaringan Mode Testnet, maka chain setting yang saya gunakan adalah chain Jaringan Mode Testnet.*

## Catatan Penting
Sebelum Anda melanjutkan dan menjalankan skrip Multi-Sender Token ERC20 ini, harap perhatikan hal-hal berikut:

**1. Pemahaman Konsep dan Keamanan:**
Pastikan Anda memiliki pemahaman yang memadai tentang penggunaan kunci pribadi (private key) dan informasi sensitif lainnya terkait akun Ethereum Anda. Kunci pribadi memberikan akses penuh ke akun Anda dan harus disimpan dengan aman.

**2. Irreversibilitas Transaksi Kripto:**
Transaksi kriptocurrency bersifat irreversible, yang berarti setelah transaksi dilakukan, Anda tidak dapat membatalkannya. Sebelum mengirimkan jumlah yang signifikan, lakukan uji coba terlebih dahulu dengan jumlah kecil untuk memastikan semua langkah berjalan dengan benar.

**3. Periksa Informasi dengan Teliti:**
Selalu periksa kembali informasi yang Anda masukkan, seperti alamat kontrak token ERC-20, ABI, alamat tujuan, dan nilai token yang akan dikirim. Kesalahan dalam informasi ini dapat mengakibatkan kehilangan dana.

**4. Pemahaman Langkah-Langkah:**
Panduan ini memberikan langkah-langkah dalam menjalankan skrip multi-sender token ERC20 di Mode Testnet. Pastikan Anda memahami setiap langkah sebelum melanjutkan. Jika Anda ragu, lebih baik mencari bantuan atau informasi tambahan terlebih dahulu.

**5. Risiko Penggunaan Kriptocurrency:**
Harap diingat bahwa penggunaan kriptocurrency melibatkan risiko tertentu, termasuk tetapi tidak terbatas pada fluktuasi harga, kehilangan dana karena kesalahan penggunaan, dan potensi ancaman keamanan. Gunakan dengan bijak dan berhati-hati dalam setiap transaksi kripto yang Anda lakukan.

Dengan memahami dan mengikuti panduan ini dengan hati-hati, Anda dapat lebih siap untuk menjalankan skrip multi-sender token ERC20 dengan aman dan efektif.

#DYOR #NFA
