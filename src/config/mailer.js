
const Mailers = {
    providers: {
        ses: {
            options: {
                region: 'us-west-2'
            },
            email: {
                address: 'Contact <no-reply@email.com>',
                arn: ''
            }
        },
        mailgun: {

        },
        mailchimp: {

        },
        googlemail: {

        },
    },
    templates: {
        UserAccount: {
            SignupVerification: {
                subject: 'New Account Activation',
                template: 'src/views/mailer/SignupVerification'
            },
        },
    },
};

export default Mailers;
