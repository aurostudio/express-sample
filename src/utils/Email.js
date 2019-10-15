
// import ejs from 'ejs';
// import aws from 'aws-sdk';
// import nodemailer from 'nodemailer';
// import sesTransport from 'nodemailer-ses-transport';
// import postmark from 'postmark';
// import mailjet from 'node-mailjet';
// import mailgun from 'mailgun-js';
// import _ from 'lodash';
// // import logger from '../../app/helpers/logger';
// import _MailerConfig from '../config/mailer';


// // const ses = new aws.SES(_AwsConfig);
// // const transporter = nodemailer.createTransport(sesTransport({
// // 	ses
// // }));


// // const sendEmailViaSES = (subject, template, toEmail, options, data, callback) => {
// // 	let attachments = null;
// // 	const ccOptions = null;

// // 	if (options.attachments) {
// // 		attachments = options.attachments;
// // 		delete options.attachments;
// // 	}

// // 	if (options.ccs) {
// // 		ccOptions.ccs = options.ccs;
// // 		delete options.ccs;
// // 	}

// // 	// Render email template
// // 	ejs.renderFile(template, data, options, ((error, body) => {
// // 		if (error || !body) {
// // 			// logger.error('MAILER_ERROR::<%s>', error);
// // 			return callback();
// // 		}

// // 		const mailOptions = {
// // 			from: _MailerConfig.providers.ses.email.address,
// // 			to: toEmail,
// // 			subject,
// // 			html: body
// // 		};

// // 		// Handle CC & BCC
// // 		if (ccOptions && ccOptions.length) {
// // 			mailOptions.cc = ccOptions.ccs;
// // 			mailOptions.bcc = ccOptions.bccs;
// // 		}

// // 		// Handle attachments
// // 		if (attachments && attachments.length) {
// // 			mailOptions.attachments = attachments;
// // 		}

// // 		transporter.sendMail(mailOptions, ((error, rs) => {
// // 			if (error || !body) {
// // 				// logger.error('MAILER_ERROR::<%s>', error);
// // 			}
// // 			// logger.info('MAILER_INFO::<%s>', rs);

// // 			callback();
// // 		}));
// //   })
// //   );
// // };

// const sendMailViaPostMark = (subject, template, toEmail, options, data) => {
// 	const client = new postmark.Client('');
// 	let attachments = '';
// 	let messages = [];

// 	if (options.attachments) {
// 		attachments = options.attachments;
// 		delete options.attachments;
// 	}

// 	return new Promise((resolve, reject) => {
// 		ejs.renderFile(template, data, options, ((error, body) => {
// 			if (error || !body) {
// 				// TODO: logger
// 				// logger.error('MAILER_ERROR::<%s>', error);
// 				return callback();
// 			}

// 			toEmail.map((value) => {
// 				const mailOptions = {};
// 				mailOptions.From = _MailerConfig.providers.ses.email.address;
// 				mailOptions.To = value.Email;
// 				mailOptions.Subject = subject;
// 				mailOptions.HtmlBody = body;

// 					// Handle attachments
// 				if (attachments && attachments.length) {
// 					mailOptions.Attachments = attachments;
// 				}

// 				messages.push(mailOptions);
// 			});

// 			messages = JSON.parse(JSON.stringify(messages));

// 			client.sendEmailBatch(messages, (error, batchResults) => {
// 				if (error) {
// 					console.log(error.message);
// 					reject(error.message);
// 					return;
// 				}
// 				resolve(batchResults);
// 			});
// 		}));
// 	});
// };

// const sendMailViaMailjet = (subject, template, toEmail, options, data) => {
// 		const mailjetResource = mailjet.connect('', '', { url: 'api.mailjet.com', version: 'v3.1', perform_api_call: true });
// 		let attachments = '';
// 		const messages = [];

// 		if (options.attachments) {
// 			attachments = options.attachments;
// 			delete options.attachments;
// 		}

// 		return new Promise((resolve, reject) => {
// 			ejs.renderFile(template, data, options, ((error, body) => {
// 				if (error || !body) {
// 					// TODO: logger
// 					// logger.error('MAILER_ERROR::<%s>', error);
// 					return callback();
// 				}

// 				toEmail.map((value) => {
// 					const mailOptions = {};
// 					mailOptions.From = { Email: _MailerConfig.providers.ses.email.address, Name: 'Tester' };
// 					mailOptions.To = [{ Email: value.Email }];
// 					mailOptions.Subject = subject;
// 					mailOptions.HTMLPart = body;

// 						// Handle attachments
// 					if (attachments && attachments.length) {
// 						mailOptions.Attachments = attachments;
// 					}

// 					messages.push(mailOptions);
// 				});

// 				mailjetResource.post('send').request({ 'Messages': messages })
// 				.then((result) => resolve(result))
// 				.catch(error => reject(error.statusCode));
// 			}));
// 		});
// };

// const sendMailViaMailGun = (subject, template, toEmail, options, data) => {
// 	const mailgunApi = mailgun({ apiKey: '', domain: '' });

// 	ejs.renderFile(template, data, options, ((error, body) => {
// 		if (error || !body) {
// 			logger.error('MAILER_ERROR::<%s>', error);
// 			return callback();
// 		}

// 		const mailOptions = {
// 			from: _MailerConfig.providers.ses.email.address,
// 			to: toEmail,
// 			subject,
// 			html: body
// 		};

// 		// Handle CC & BCC
// 		if (ccOptions && ccOptions.length) {
// 			mailOptions.cc = ccOptions.ccs;
// 			mailOptions.bcc = ccOptions.bccs;
// 		}

// 		// Handle attachments
// 		if (attachments && attachments.length) {
// 			mailOptions.attachment = attachments;
// 		}

// 		mailgunApi.messages().send(mailOptions, (error, result) => {
// 			if (error || !body) {
// 				logger.error('MAILER_ERROR::<%s>', error);
// 				return;
// 			}
// 			logger.info('MAILER_INFO::<%s>', result);
// 		});
//   }));
// };

// export default {
//   //sendEmailViaSES,
// 	sendMailViaPostMark,
// 	sendMailViaMailjet,
// 	sendMailViaMailGun
// };
