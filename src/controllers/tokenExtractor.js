async function tokenExtractor(header) {
    return new Promise(function (resolve, reject) {
        if (header == null || header == '') {
            resolve(false)
        }
        if (header.startsWith("Bearer ")) {
            let token = header.substring(7, header.length)
            resolve(token);
        }
        resolve(false)
    })
}
module.exports = tokenExtractor;