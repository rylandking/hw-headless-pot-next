const contentstack = require('@contentstack/management');

const Stack = contentstack.client({}).stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    branch_uid: process.env.CONTENTSTACK_BRANCH,
});

export default {
    getElement(id, type) {
        return Stack.contentType(type)
            .entry(id)
            .fetch({
                include_publish_details: true,
            })
    },

    async getElementWithRefs(type, url) {
        const entry = await Stack
            .contentType(type)
            .entry()
            .query({
                query: { url },
                include_publish_details: true,
            })
            .find()
            .then(res => res.items[0])

        const references = getReferences(entry);

        const objectsById = await Promise.all(references.map(async (ref) => {
            return {
                key: `${ref._content_type_uid}:${ref.uid}`,
                value: await Stack.contentType(ref._content_type_uid)
                    .entry(ref.uid)
                    .fetch()
            }
        })).then((result) => result.reduce((acc, { key, value }) => {
            acc.set(key, value);
            return acc;
        }, new Map()));


        return resolveReferences(entry, objectsById);
        // return entry;
    },

    getElementBySlug(type, url) {
        return Stack
            .contentType(type)
            .entry()
            .query({
                query: { url },
                include_publish_details: true,
            })
            .find()
            .then(res => res.items[0])
    },
    getElementsByType(type) {
        return Stack
            .contentType(type)
            .entry()
            .query({
                include_publish_details: true,
            })
            .find()
            .then(res => res.items)
    },
    getSingleElementByType(type) {
        return Stack
            .contentType(type)
            .entry()
            .query({
                include_publish_details: true,
            })
            .find()
            .then(res => res.items[0])
    },
    getStack() {
        return Stack;
    }
};


function getReferences(entry) {
    const references = [];

    if (!entry || typeof entry !== 'object') {
        return [];
    }

    if (Array.isArray(entry)) {
        for (let i = 0; i < entry.length; i++) {
            references.push(...getReferences(entry[i]));
        }

        return references;
    }

    if (entry.hasOwnProperty('_content_type_uid')) {
        return [entry];
    }

    for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
            references.push(getReferences(entry[key]));
        }
    }

    return references.flat();
}

function resolveReferences(entry, objectsById) {
    if (!entry || typeof entry !== 'object') {
        return entry;
    }

    if (Array.isArray(entry)) {
        return entry.map((item) => resolveReferences(item, objectsById));
    }

    if (entry.hasOwnProperty('_content_type_uid')) {
        return objectsById[`${entry._content_type_uid}:${entry.uid}`];
    }

    for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
            entry[key] = resolveReferences(entry[key], objectsById);
        }
    }

    return entry;
}