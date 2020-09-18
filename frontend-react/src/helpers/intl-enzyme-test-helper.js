import { IntlProvider } from 'react-intl';
import { mount, shallow } from 'enzyme';
import translations from '../translations';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const defaultLocale = 'en';
const locale = defaultLocale;
const messages = translations[locale]; // en.js

export function mountWithIntl (node) {
    return mount(node, {
        wrappingComponent: IntlProvider,
        wrappingComponentProps: {
            locale,
            defaultLocale,
            messages
        }
    });
}

export function shallowWithIntl (node) {
    return shallow(node, {
        wrappingComponent: IntlProvider,
        wrappingComponentProps: {
            locale,
            defaultLocale,
            messages
        }
    });
}
