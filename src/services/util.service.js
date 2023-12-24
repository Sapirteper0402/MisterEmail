
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    formatSentAt
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}


function formatSentAt(sentAt) {
    const sentDate = new Date(sentAt);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (isToday(sentDate, currentDate)) {
        // If the date is today, return the formatted time without AM/PM
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return sentDate.toLocaleTimeString('en-US', options);
    } else if (sentDate.getFullYear() === currentYear) {
        // If the date is in the current year, return formatted month, day, and year
        const options = { month: 'short', day: 'numeric'};
        return sentDate.toLocaleDateString('en-US', options);
    } else {
        // If the date is not in the current year, return only the year
        return sentDate.getFullYear().toString();
    }
}

function isToday(date, currentDate) {
    return (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
}