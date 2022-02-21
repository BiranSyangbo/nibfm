const sendGridMail = require('@sendgrid/mail');

((sendGridMailHelper) => {

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

            const mail = {
                to: RECIPIENT_EMAILS,
                from: SENDGRID_SENDER_EMAIL,
                subject: message.title,
                html: message.body,
               
            }

            // Finally send the email
            const sendGridMailResponse = await sendGridMail.send(mail, true); // mail, allowMultipleRecipients

            return {
                success: true,
                content: sendGridMailResponse[0],
            }

        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    };

})(module.exports);
