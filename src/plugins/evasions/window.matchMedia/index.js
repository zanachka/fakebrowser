'use strict';

const {PuppeteerExtraPlugin} = require('puppeteer-extra-plugin');

const withUtils = require('../_utils/withUtils');

class Plugin extends PuppeteerExtraPlugin {
    constructor(opts = {}) {
        super(opts);
    }

    get name() {
        return 'evasions/window.matchMedia';
    }

    async onPageCreated(page) {
        await withUtils(page).evaluateOnNewDocument((utils) => {
            const _Object = utils.cache.Prototype.Object;

            utils.replaceWithProxy(window, 'matchMedia', {
                apply(target, thisArgs, args) {
                    console.log(`hook window matchMedia ${args.join('|')}`);

                    return Reflect.apply(target, thisArgs, args);
                },
            });
        });
    }
}

module.exports = function (pluginConfig) {
    return new Plugin(pluginConfig);
};