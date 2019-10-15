// import * as utilities from '../Utils/Utils';

// const environmentConfig = process.env;
// const environment = utilities.parseEnvironment(process.argv[2] || environmentConfig.NODE_ENV);
// global.__base = __dirname;

// var config = {
//     environment: environment,
//     version: environmentConfig.APP_VERSION,
//     port: utilities.parseInteger(process.env.PORT) || utilities.parseInteger(environmentConfig.APP_PORT),
//     secret: environmentConfig.APP_SECRET,
//     api: environmentConfig.APP_URL,
//     stripe: environmentConfig.STRIPE_PUBLISHABLE_KEY,
//     // stripeTest: testEnvironmentConfig.stripe,
//     pricing: {
//         maxRefund: 2499,
//         base: 2499,
//         partner: 2499,
//         dependant: 499,
//         forms: {
//             t4: 299,
//             t3: 299,
//             t2202a: 299,
//             t4a: 299,
//             t4e: 299,
//             t5: 299,
//             rc62: 99,
//             noticeOfAssessment: 299,
//             rrsp: 299,
//             other: 0
//         },
//         credits: {
//             workingIncomeTaxBenefit: 499,
//             studentLoanInterest: 199,
//             medicalExpense: 299,
//             transitPasses: 99,
//             familyTaxCut: 499,
//             adoptionExpenses: 299,
//             federalPoliticalContributions: 299,
//             homeBuyersAmount: 99
//         }
//     },
//     // area51: {
//     //     routesDirectory: "Area51/",
//     //     authUser: environmentConfig.area51.auth.user,
//     //     authToken: environmentConfig.area51.auth.token,
//     //     agentID: environmentConfig.area51.agentID,
//     //     user: environmentConfig.area51.user,
//     //     apiRoutes: environmentConfig.area51.apiRoutes,
//     //     filingStatus: {
//     //         id: 3,
//     //         pendingTaxReview: 'pending-tax-review',
//     //         taxesInReview: 'taxes-in-review',
//     //         taxDataIssue: 'tax-data-issue',
//     //         taxDataVerified: 'tax-data-verified',
//     //         pendingClientSignature: 'pending-client-signature',
//     //         pendingSignatureReview: 'pending-signature-review',
//     //         signatureIssue: 'signature-issue',
//     //         signaturesVerified: 'signatures-verified',
//     //         pendingRC72: 'pending-rc72',
//     //         complete: 'complete'
//     //     }
//     // },
//     // zendesk: {
//     //     routesDirectory: "Zendesk/",
//     //     authUser: environmentConfig.zendesk.auth.user,
//     //     authToken: environmentConfig.zendesk.auth.token,
//     //     agentID: environmentConfig.zendesk.agentID,
//     //     user: environmentConfig.zendesk.user,
//     //     apiRoutes: environmentConfig.zendesk.apiRoutes,
//     //     filingStatus: {
//     //         id: 29852328,
//     //         pendingTaxReview: 'pending-tax-review',
//     //         taxesInReview: 'taxes-in-review',
//     //         taxDataIssue: 'tax-data-issue',
//     //         taxDataVerified: 'tax-data-verified',
//     //         pendingClientSignature: 'pending-client-signature',
//     //         pendingSignatureReview: 'pending-signature-review',
//     //         signatureIssue: 'signature-issue',
//     //         signaturesVerified: 'signatures-verified',
//     //         pendingRC72: 'pending-rc72',
//     //         complete: 'complete'
//     //     }
//     // },
//     ses: {
//         options: {
//             region: "us-west-2"
//         },
//         subject: {
//             verification: "Snapfile Account Verification",
//             reset: "Snapfile Password Reset",
//             taxDataIssue: "Snapfile Tax Data Issue",
//             pendingClientSignature: "Snapfile Document Signature Required",
//             signatureIssue: "Snapfile Signature Issue",
//             signaturesVerified: "Snapfile Taxes Filed",
//             complete: "Snapfile Additional Tax Documents",
//             signedDocuments: "Snapfile Signed Tax Documents",
//             newMessage: "Snapfile New Message From Agent",
//             refundPayment: "Snapfile Payment Refunded",
//             skipPayment: "Snapfile Free Tax Filing"
//         },
//         email: {
//             address: "\"Snapfile\" <noreply@snapfile.ca>",
//             arn: "arn:aws:ses:us-west-2:580100260495:identity/noreply@snapfile.ca"
//         }
//     },
//     push: {
//         api: "https://" + environmentConfig.PUSH_SECRET_KEY + ":@push.ionic.io/api/v1/push",
//         appID: environmentConfig.PUSH_APP_ID,
//         publicKey: environmentConfig.PUSH_PUBLIC_KEY,
//         secretKey: environmentConfig.PUSH_SECRET_KEY
//     },
//     instantCashBack: {
//         enabled: true,
//         documentTypes: ["T1153", "RC71", "RC72"],
//         authToken: environmentConfig.INSTANT_CASHBACK_AUTH_TOKEN
//     },
//     apiDirectory: "",
//     utilsDirectory: "Utils/",
//     routeDirectory: "routes/",
//     controllerDirectory: "controllers/",
//     modelDirectory: "models/",
//     viewDirectory: "views/",
//     assetDirectory: "assets/",
//     imageDirectory: "assets/images/",
//     cssDirectory: ".assets/css/",
//     scssDirectory: "assets/scss/",
//     dataDirectory: environmentConfig.DATA_DIRECTORY,
//     formsDirectory: "Forms",
//     signaturesDirectory: "Signatures",
//     documentsDirectory: "Documents",
//     resourcesDirectory: "Resources",
//     logsDirectory: "Logs",
//     tempDirectory: "Temp",
//     pdfLogFileName: "PDF_Log.txt",
//     font: {
//         fileName: "OpenSans-Regular.ttf",
//         md5: "629a55a7e793da068dc580d184cc0e31",
//         fontSize: 10,
//         defaultSpacing: 14.5
//     },
//     businessInfo: {
//         name: "Snapfile Incorporated",
//         address: "2035 Redtail Common NW",
//         city: "Edmonton",
//         province: "Alberta",
//         postalCode: "T5S0H3",
//         discounter: {
//             signature: "discounter_signature.svg",
//             name: "David Schwede",
//             location: "Edmonton",
//             code: "?"
//         },
//         electronicFilerName: "Houghton Inc.",
//         eFileNumber: 0
//     },
//     freeFiling: "FREEFILING",
//     skippedPayment: "SKIPPEDPAYMENT",
//     coupons: [
//         {
//             code: "SNAP101",
//             amount: "10%"
//         },
//         {
//             code: "101SNAP",
//             amount: "10%"
//         },
//         {
//             code: "NAIT101",
//             amount: "100%"
//         },
//         {
//             code: "GMAC101",
//             amount: "100%"
//         },
//         {
//             code: "UOFA101",
//             amount: "100%"
//         },
//         {
//             code: "THETACHI",
//             amount: "10%"
//         },
//         {
//             code: "I<3TAXES",
//             amount: "10%"
//         },
//         {
//             code: "I<3SNAP",
//             amount: "100%"
//         },
//         {
//             code: "STREET101",
//             amount: "100%"
//         },
//         {
//             code: "SNAPLIFT",
//             amount: "10%"
//         },
//         {
//             code: "CHSNAP",
//             amount: "100%"
//         },
//         {
//             code: "RVLSNAP",
//             amount: "100%"
//         },
//         {
//             code: "YEGLOVESSNAP",
//             amount: "100%"
//         }
//     ],
//     testAccounts: {
//         domains: [
//             "snapfile.ca"
//         ],
//         emails: [
//             "snapfile.incorporated@gmail.com",
//             "daveschwede@gmail.com",
//             "richard.d.houghton@gmail.com"
//         ]
//     },
//     maxEmailLength: 254,
//     minPasswordLength: 6,
//     maxPasswordLength: 128,
//     maxMessageLength: 4096,
//     maxPushTokenLength: 255,
//     formTypes: [
//         "T4",
//         "T3",
//         "T2202A",
//         "T4A",
//         "T4E",
//         "T5",
//         "RC62",
//         "Notice-of-Assessment",
//         "RRSP",
//         "Other"
//     ],
//     documentTypes: [
//         "T1153",
//         "T183",
//         "RC71",
//         "RC72",
//         "T1",
//         "T1013"
//     ],
//     // Many elements were here previously for testing and easy swapping
//     // They have been removed to clean up ~450 lines of unnecessary data.
//     // Please see commit fc8eadf0b48a0c4d2ab1cfc46292d67ab8126a71 if that data is ever needed
//     documentConfiguration: {
//         "T1153": {
//             blankTemplate: {
//                 fileName: "t1153-14e.pdf",
//                 md5: "10b290be6788a141fe23052de3efcb49"
//             },
//             defaultWhiteList: [
//                 "signature"
//             ],
//             pages: [
//                 {
//                     index: 0,
//                     elements: [
//                         {
//                             name: "Signature",
//                             id: "signature",
//                             type: "signature",
//                             position: {
//                                 x: 220,
//                                 y: 171
//                             },
//                             size: {
//                                 width: 970,
//                                 height: 98
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         "T183": {
//             blankTemplate: {
//                 fileName: "t183-15e.pdf",
//                 md5: "dec9d83f7d689e2af41db673edab9c8b"
//             },
//             defaultWhiteList: [
//                 "signature-2"
//             ],
//             pages: [
//                 {
//                     index: 0,
//                     elements: [
//                         {
//                             name: "Signature 2",
//                             id: "signature-2",
//                             type: "signature",
//                             position: {
//                                 x: 24,
//                                 y: 305
//                             },
//                             size: {
//                                 width: 980,
//                                 height: 55
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         "RC71": {
//             blankTemplate: {
//                 fileName: "rc71-15e.pdf",
//                 md5: "7caeb009152065a5e0e454ee263a428b"
//             },
//             defaultWhiteList: [
//                 "discounter-signature",
//                 "signature"
//             ],
//             pages: [
//                 {
//                     index: 0,
//                     elements: [
//                         {
//                             name: "Discounter Signature",
//                             id: "discounter-signature",
//                             type: "discounter-signature",
//                             position: {
//                                 x: 22,
//                                 y: 212
//                             },
//                             size: {
//                                 width: 610,
//                                 height: 96
//                             }
//                         },
//                         {
//                             name: "Signature",
//                             id: "signature",
//                             type: "signature",
//                             position: {
//                                 x: 20,
//                                 y: 114
//                             },
//                             size: {
//                                 width: 870,
//                                 height: 240
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         "RC72": {
//             blankTemplate: {
//                 fileName: "rc72-15e.pdf",
//                 md5: "c4f0b73becde80fdc00ec48a913f32de"
//             },
//             defaultWhiteList: [
//                 "discounter-signature"
//             ],
//             pages: [
//                 {
//                     index: 0,
//                     elements: [
//                         {
//                             name: "Discounter Signature",
//                             id: "discounter-signature",
//                             type: "discounter-signature",
//                             position: {
//                                 x: 45,
//                                 y: 307
//                             },
//                             size: {
//                                 width: 1014,
//                                 height: 78
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         "T1013": {
//             blankTemplate: {
//                 fileName: "t1013-15e.pdf",
//                 md5: "7f01710c7c0a2376c0671ea34893a417"
//             },
//             partialTemplate: {
//                 fileName: "t1013-partial.pdf",
//                 //md5: "026b662acd0d137e7fd17025f57766b0"
//                 //md5: "03427371e55d915c6aeb3e1eba1700a9"
//                 md5: "f57c0cfbf2bcbfc47229aefd2f86dce5"
//             },
//             partialWhiteList: [
//                 "sin",
//                 "first-name",
//                 "last-name",
//                 "full-name"
//             ],
//             defaultWhiteList: [
//                 "signature-date",
//                 "signature"
//             ],
//             pages: [
//                 {
//                     index: 0,
//                     elements: [
//                         {
//                             name: "Social Insurance Number",
//                             id: "sin",
//                             type: "string",
//                             position: {
//                                 x: 25,
//                                 y: 604
//                             }
//                         },
//                         {
//                             name: "First Name",
//                             id: "first-name",
//                             type: "string",
//                             position: {
//                                 x: 170,
//                                 y: 604
//                             }
//                         },
//                         {
//                             name: "Last Name",
//                             id: "last-name",
//                             type: "string",
//                             position: {
//                                 x: 316,
//                                 y: 604
//                             }
//                         },
//                     ]
//                 },
//                 {
//                     index: 1,
//                     elements: [
//                         {
//                             name: "Full Name",
//                             id: "full-name",
//                             type: "string",
//                             position: {
//                                 x: 24,
//                                 y: 402
//                             }
//                         },
//                         {
//                             name: "Signature Date",
//                             id: "signature-date",
//                             type: "string",
//                             position: {
//                                 x: 428,
//                                 y: 402
//                             }
//                         },
//                         {
//                             name: "Signature",
//                             id: "signature",
//                             type: "signature",
//                             position: {
//                                 x: 39,
//                                 y: 377.5
//                             },
//                             size: {
//                                 width: 800,
//                                 height: 52
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
// };

// export default config;
