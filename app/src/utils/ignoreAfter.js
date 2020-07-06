export default function ignoreAfter(str, ignoreList) {
    for(const ignore of ignoreList) {
        str = str.split(ignore)[0]
    }
    return str;
}
