const fs = require("fs");

let setting = JSON.parse(fs.readFileSync('./setting.json'));

exports.fakeStatus = (faketeks, buffer = setting.pathImg) => {
    return { 
        key: { 
            fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" }) 
        }, 
        message: { 
            "imageMessage": { 
                "mimetype": "image/jpeg", 
                "caption": faketeks, 
                "jpegThumbnail": buffer
            } 
        } 
    }
}

exports.fakeToko = (fake, buffer = setting.pathImg) => {
    return {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" })
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": buffer
					},
					"title": fake,
					"description": "Ohayo Dinata Onican",
					"currencyCode": "IDR",
					"priceAmount1000": "10000000",
					"retailerId": "Self Bot",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		    }
        }
	}
}

exports.fakeTroli = (fake, item, buffer = setting.pathImg) => {
   return {
           key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...({
                    remoteJid: "status@broadcast"
                })
            },
            message: {
                orderMessage: {
                    itemCount: item,
                    status: 200,
                    surface: 200,
                    message: fake,
                    orderTitle: fake,
                    thumbnail: buffer,
                    sellerJid: '0@s.whatsapp.net'
                }
            }      
   }
}
