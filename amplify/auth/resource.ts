import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: 'MicrosoftEntraIDSAML',
        metadata: {
          metadataContent: 'https://login.microsoftonline.com/646e2152-52af-462f-b278-f26c7098ffe3/federationmetadata/2007-06/federationmetadata.xml?appid=551d475b-555f-449a-8143-aaa4ffe33aeb', // or content of the metadata file
          metadataType: 'URL', // or 'FILE'
        },
      },
      logoutUrls: ['http://localhost:5173/'],
      callbackUrls: [
        'http://localhost:5173/'
      ],
    },
  },
});
