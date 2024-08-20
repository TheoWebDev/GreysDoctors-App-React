export const sliceInitials = (name) => {
    const splitName = name.split(' ');
    return splitName.map(name => name.charAt(0)).join('');
};