const isProduction = process.env.NODE_ENV === 'production';

export function setObjectId(objectId: string) {
    return !isProduction ? { "data-sb-object-id": objectId } : {};
}

export function setFieldPath(fieldPath: string) {
    return !isProduction ? { "data-sb-field-path": fieldPath } : {};
}
