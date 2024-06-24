const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const pinata = pinataSDK(process.env.API_Key, process.env.API_Secret);

const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./image/2.png');
const options = {
    pinataMetadata: {
        name: "My NFT COllection",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const pinFileToIPFS = () =>{
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        console.log(result,"result1");
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
} 

const pinJsontoIPFS = (body) =>{
    
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        console.log(result);
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

const getMetadata = async () =>{
    const imageUrl = await pinFileToIPFS()
    console.log(imageUrl);
    const body = {
        message: 'My first nft collection',
        description: 'This is my some collection of nft',
        image:imageUrl
    };

    const metadata = await pinJsontoIPFS(body);
    console.log(metadata);
    // console.log(metadata);
}

getMetadata()


// pinata.testAuthentication().then((result) => {
//     //handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

