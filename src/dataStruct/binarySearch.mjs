export function binarySearch(data, v, compare = (a,b) => a - b) {
    let l = 0, r = data.length - 1;

    while(l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (compare(v, data[mid]) < 0) r = mid - 1;
        else if (compare(v, data[mid]) > 0) l = mid + 1;
        else return mid;
    }
    return null;
}

// Returns the index of v (as an array of one element), if found, otherwise
// returns the indices of the elements that fall on either side of v (as an
// array of two elements).
// When two indices are returned, one or the other may be outside the range of
// the data array if the value v falls outside of the data array.
export function binarySearchClosest(data, v, compare = (a,b) => a - b) {
    let l = 0, r = data.length - 1;
    while(l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (compare(v, data[mid]) < 0) r = mid - 1;
        else if (compare(v, data[mid]) > 0) l = mid + 1;
        else return [mid];
    }
    return [r, l];
}
