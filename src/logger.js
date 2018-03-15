
module.exports = {
    log: (msg) => {
        if (typeof global.it === 'function') {
            return;
        }

        console.log(msg);
    }
}
