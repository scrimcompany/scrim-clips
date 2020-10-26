import { admin } from '../../utils/auth/firebaseAdmin'

// Sendinblue API
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

const sendEmail = async (req, res) => {
    const uid = req.query.uid;
    let email;

    if (!uid) {
        return res.status(401).send("missing uid");
    }

    try {
        const userRecord = await admin.auth().getUser(uid);
        const user = userRecord.toJSON();
        email = user.email;
    } catch (error) {
        return res.status(401).send(error);
    }

    if (!email) {
        return res.status(401).send("missing email");
    }

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        to: [{
            email: email
        }],
        sender: { name: "clips.scrim.app", email: "scrimcompany@gmail.com" },
        subject: "New highlights",
        htmlContent: `
        <html>
            <body>
                <p>Your highlights were generated from one of your recent matches.</p>
            </body>
        </html>
        `
    };

    return apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
        return res.status(200).json("OK")
    }, function (error) {
        console.error(error);
        return res.status(401).send(error);
    });
}

export default sendEmail
