var deburr = require('lodash/deburr');

export default (item) => {
    return deburr(item.trim().toLowerCase().replace(/\s+/g, '-'));
}