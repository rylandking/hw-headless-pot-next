import { ContentstackContentSource } from '@stackbit/cms-contentstack';
import { Actions } from '@stackbit/utils'


import { defineStackbitConfig, DocumentStringLikeFieldNonLocalized } from '@stackbit/types';
import { Actions } from '@stackbit/utils';

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "18",
    ssgName: "nextjs",
    contentSources: [
        new ContentstackContentSource({
            apiKey: process.env.CONTENTSTACK_API_KEY!,
            managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
            branch: process.env.CONTENTSTACK_BRANCH!,
            publishEnvironmentName: process.env.CONTENTSTACK_PUBLISH_ENV || 'production',
            masterLocale: process.env.CONTENTSTACK_MASTER_LOCALE || 'en',
            skipFetchOnStartIfCache: true
        }),
    ],
    actions: [
        Actions.GenerateContentFromPreset({
            label: 'Generate content with AI',
            siteId: process.env.SITE_ID,
            modelsConfig: [
                {
                    name: 'article',
                    mainListField: 'content.children',
                    customPrompt:
                        'You are writing an article.',
                },
            ],
        }),
    ],
    modelExtensions: [
        {
            name: 'article_listing_page',
            type: 'page',
        },
        {
            name: 'article',
            type: 'page',
            urlPath: '{url}',
            fields: [
                {
                    label: 'URL',
                    name: 'url',
                    type: 'slug'
                },
            ]
        }
    ],
    actions: [
        Actions.GenerateContentFromPreset({
            label: 'Generate content with AI',
            modelsConfig: [
                {
                    name: 'landing_page',
                },
            ],
        }),
    ],
    sitemap: (options) => {
        const pageModels = ['article_listing_page', 'landing_page', 'pot_landing_page'];
        return options.documents.filter((document) => pageModels.includes(document.modelName)).map((document) => {
            const slug = (document.fields.url as DocumentStringLikeFieldNonLocalized)?.value ?? '/';
            const urlPath = slug === 'home' ? '/' : slug;
            return {
                urlPath: urlPath,
                document: document
            }
        })
    }
})
