import { admin } from '../../utils/auth/firebaseAdmin'

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

export const send = async (uid, link, clips) => {
    try {
        const userRecord = await admin.auth().getUser(uid);
        const user = userRecord.toJSON();
        const email = user.email;
        if (!email) {
            return Promise.reject("Email not found for user");
        }

        const clipsHtml = clips && clips.map(url => `<p>${encodeURI(url)}</p>`).join("")

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
                <p><a href="${link}">View clips via website</a></p>
                <p>or download clips,</p>
                ${clipsHtml}
            </body>
        </html>
        `
        };

        return apiInstance.sendTransacEmail(sendSmtpEmail);


    } catch (error) {
        return Promise.reject(error);
    }
}