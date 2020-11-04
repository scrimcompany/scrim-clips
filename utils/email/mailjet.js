const mailjet = require('node-mailjet').connect('9cd3cf2e8d812a8ea48b9a9902edf0da', '752c7420b8f10ba06409d5939bf27b3b')

export const send = async (uid, link, clips) => {

    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "scrimcompany@gmail.com",
                        "Name": "Adrian"
                    },
                    "To": [
                        {
                            "Email": "scrimcompany@gmail.com",
                            "Name": "Adrian"
                        }
                    ],
                    "Subject": "Greetings from Mailjet.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        });

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}


