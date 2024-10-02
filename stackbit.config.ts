import { ContentstackContentSource } from '@stackbit/cms-contentstack';

import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "nextjs",
    "contentSources": [
        new ContentstackContentSource({
            apiKey: "blt8cf7fa06f3654267",
            managementToken: "cse021dd4c9a69c1da72f59ad6",
            branch: "main",
            publishEnvironmentName: process.env.CONTENTSTACK_PUBLISH_ENV || 'preview',
            masterLocale: process.env.CONTENTSTACK_MASTER_LOCALE || 'en',
            skipFetchOnStartIfCache: true
        }),
        ],
    "postInstallCommand": "npm i --no-save @stackbit/types @stackbit/cms-contentstack"
})
