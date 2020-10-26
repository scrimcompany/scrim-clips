import { admin } from '../../utils/auth/firebaseAdmin'
import { send } from '../../utils/email/sendinblue'

const sendEmail = async (req, res) => {
    const uid = req.query.uid;

    if (!uid) {
        return res.status(401).send("missing uid");
    }

    return send(uid).then(function (data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
        return res.status(200).json("OK")
    }, function (error) {
        console.error(error);
        return res.status(401).send(error);
    });
}

export default sendEmail
