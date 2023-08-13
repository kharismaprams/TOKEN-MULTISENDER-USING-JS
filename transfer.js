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
