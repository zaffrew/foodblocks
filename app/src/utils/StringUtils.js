export function removeRepeatedWhitespace(str) {
    return str.trim().replace(/\s+/g, " ")
}

export function removeWhiteSpace(str) {
    return str.replace(/\s+/g, " ")
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
