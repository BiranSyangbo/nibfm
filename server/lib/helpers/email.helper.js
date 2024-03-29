
((sendGridMailHelper) => {
    const sendGridMail = require('@sendgrid/mail');
    const emailTemplateConfig = require('../configs/email-template-config');

    sendGridMailHelper.sendMail = async (message) => {
        try {

            // Get the send-grid API key
            const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;

            // Return if API key not found
            if (!SENDGRID_API_KEY) {
                return {
                    success: false,
                    message: "Sendgrid API key not set",
                }
            }

            // Get the send-grid sender email address
            const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || null;
            console.log({ SENDGRID_SENDER_EMAIL })
            // Return if sender email is not found
            if (!SENDGRID_SENDER_EMAIL) {
                return {
                    success: false,
                    message: "Sendgrid sender email address not set",
                }
            }

            // Set API keys for send-grid service
            sendGridMail.setApiKey(SENDGRID_API_KEY);

            // Prepare the mail message recipient
            const RECIPIENT_EMAILS = [...new Set([message.email].flat())];
            let emailHtml = emailTemplateConfig.replace('%body%', message.body)
            const mail = {
                to: RECIPIENT_EMAILS,
                from: `NBIMF <${SENDGRID_SENDER_EMAIL}>`,
                subject: message.title,
                html: emailHtml,//message.body,

            }

            // Finally send the email
            const sendGridMailResponse = await sendGridMail.send(mail, true); // mail, allowMultipleRecipients

            return {
                success: true,
                content: sendGridMailResponse[0],
            }

        } catch (error) {
            console.log("ERROR on email.helper", error.stack);
            return {
                success: false,
                message: error.message,
            }
        }
    };

})(module.exports);
