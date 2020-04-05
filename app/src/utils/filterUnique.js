export default function filterUnique(arr) {
    return arr.filter((item, i) => {
        return arr.indexOf(item) === i
    })
}
