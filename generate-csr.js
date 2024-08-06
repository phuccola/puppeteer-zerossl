
'use strict';

const crypto = require('crypto');

const { privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
});

const csr = crypto.createSign('RSA-SHA256');
const csrInfo = [
    '-----BEGIN CERTIFICATE REQUEST-----\n',
    'CN=167.172.74.191\n',
    'O=cola\n', 
    'L=Ho Chi Minh\n',
    'ST=Ho Chi Minh\n',
    'C=VietNam\n',
    '-----END CERTIFICATE REQUEST-----\n'
];
csr.update(csrInfo.join(''));
csr.end();
const csrData = csr.sign(privateKey, 'base64');

console.log(privateKey, 'privateKey')
console.log(csrData, 'csrData')
