import en from './en';
import fr from './fr';

const flattenMessages = (nestedMessages, prefix = '') =>
    Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});

const translations = {
    en: flattenMessages(en),
    fr: flattenMessages(fr)
};

export default translations;
