import cheerio from "react-native-cheerio";

async function getHTML(URL) {
    return await fetch(URL)
        .then(response => response.text())
}

async function getDOM(URL) {
    return getHTML(URL).then(html => {
        return cheerio.load(html)
    })
}

export {getHTML, getDOM}
