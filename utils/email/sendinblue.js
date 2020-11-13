import { admin } from '../../utils/auth/firebaseAdmin'

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API;

export const send = async (uid, link, clips) => {
    try {
        const userRecord = await admin.auth().getUser(uid);
        const user = userRecord.toJSON();
        const email = user.email;
        if (!email) {
            return Promise.reject("Email not found for user");
        }

        const clipsHtml = clips && clips.map(url => `<p>${encodeURI(url.replace("https://sfo2.digitaloceanspaces.com/scrim-demos/", "https://scrim-demos.sfo2.cdn.digitaloceanspaces.com/"))}</p>`).join("")

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
                    <p>View clips here: ${link}</p>
                    <p>or download them individually</p>
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