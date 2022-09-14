export function getFullName(person) {
    return person.firstName + ' ' + person.lastName
}

export function makeGaveCase(word) {
    const root = word.slice(0, word.length - 2);
    const end = word.slice(word.length - 2);

    if (end === 'ая') {
        return root + 'ую';
    } else if (end[1] === 'а') {
        return root + end[0] + 'у';
    } else if (end[1] === 'я') {
        return root + end[0] + 'ю';
    } else return word;
}

export function getFullNameGaveCase(person) {
    return makeGaveCase(person.firstName)+ ' ' + makeGaveCase(person.lastName);
}
