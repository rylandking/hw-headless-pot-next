import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
    "api_key": process.env.CONTENTSTACK_API_KEY,
    "delivery_token": process.env.CONTENTSTACK_DELIVERY_TOKEN,
    "environment": process.env.CONTENTSTACK_ENVIRONMENT,
});

export default {
    getElement(id, type) {
        return Stack.ContentType(type)
            .Entry(id)
            .toJSON()
            .fetch();
    },

    getElementWithRefs(id, type, references) {
        return Stack.ContentType(type)
            .Entry(id)
            .includeReference(...references)
            .toJSON()
            .fetch();
    },

    getElementBySlug(type, slug) {
        return Stack.ContentType(type)
            .Query()
            .where('slug', { '$eq': slug })
            .toJSON()
            .find()
            .then((result) => {
                return result[0][0];
            });
    },
    getElementsByType(type) {
        return Stack.ContentType(type)
            .Query()
            .toJSON()
            .find().then((result) => {
                return result[0];
            });
    },
    getSingleElementByType(type) {
        return Stack.ContentType(type)
            .Query()
            .toJSON()
            .find()
            .then((result) => {
                return result[0][0];
            });
    },
    getStack() {
        return Stack;
    }
};
