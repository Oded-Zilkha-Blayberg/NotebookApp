/**
 * מחזירה פורמט תאריך בעברית
 * @param date 
 * @returns {String} of date
 */
export function hebrewDateString(date:Date) {
    let dateString = "";

    if (isToday(date) || isTomorrow(date)) {
        return hourAndMinutesString(date);
    } else if (isInMoreTwoDays(date)) {
        return `מחרתיים ב-${hourAndMinutesString(date)}`
    }

    return `${date.getDate()} ב${getMonthShortNameInHebrew(date)} ${date.getFullYear()}, ${hourAndMinutesString(date)}`
};

export function hebrewDateOnlyString(date:Date) {
    return `יום ${getWeekDayShortNameInHebrew(date)}, ${hebrewDateAndMonthShort(date)} ${date.getFullYear()}`;
}

export function hebrewDateAndMonthShort(date:Date) {
    return `${date.getDate()} ב${getMonthShortNameInHebrew(date)}`
}

export function hebrewDateAndMonthLong(date:Date) {
    return `${date.getDate()} ב${getMonthNameInHebrew(date)}`
}

export function hourAndMinutesString(date:Date) {
    return `${("0" + date.getHours().toString()).slice(-2)}:${("0" + date.getMinutes().toString()).slice(-2)}`;
}

export function shortDatetimeString(date:Date) {
    const dateString = shortDateString(date);
    return `${dateString}${dateString ? ", " : ""}${hourAndMinutesString(date)}`;
};

export function shortDateString(date:Date) {
    if (isToday(date)) {
        return "";
    } else if (isTomorrow(date)) {
        return "מחר";
    } else if (isInCurrentYear(date)) {
        return hebrewDateAndMonthLong(date);
    } else {
        return `${hebrewDateAndMonthLong(date)} ${date.getFullYear()}`;
    }
};

export function isInCurrentYear(date:Date) {
    return (new Date()).getFullYear() == date.getFullYear();
}

export function isToday(date:Date, today:Date = new Date()) {
    return date.getDate() == today.getDate()
    && date.getMonth() == today.getMonth()
    && date.getFullYear() == today.getFullYear();
};

export function isInMoreXDays(date:Date, daysToAdd:number) {
    let wantedDate = new Date();
    wantedDate.setDate(wantedDate.getDate() + daysToAdd);
    return isToday(date, wantedDate);
};

export function isTomorrow(date:Date) {
    return isInMoreXDays(date, 1);
};

export function isInMoreTwoDays(date:Date) {
    return isInMoreXDays(date, 2);
};

export function isAfterToday(date:Date, today:Date = new Date()) {
    return isToday(date, today) || date.getTime() > today.getTime();
};

export function isInMoreXDaysOrMore(date:Date, daysToAdd:number) {
    let wantedDate = new Date();
    wantedDate.setDate(wantedDate.getDate() + daysToAdd);
    return isAfterToday(date, wantedDate);
};

export function isTimeOver(date:Date) {
    return (new Date()) > date;
};

export function getMonthNameInHebrew(date:Date) {
    switch (date.getMonth() + 1) {
        case 1:
            return "ינואר";
        case 2:
            return "פברואר";
        case 3:
            return "מרץ";
        case 4:
            return "אפריל";
        case 5:
            return "מאי";
        case 6:
            return "יוני";
        case 7:
            return "יולי";
        case 8:
            return "אוגוסט";
        case 9:
            return "ספטמבר";
        case 10:
            return "אוקטובר";
        case 11:
            return "נובמבר";
        case 12:
            return "דצמבר";
    };
};

export function getMonthShortNameInHebrew(date:Date) {
    const monthName = getMonthNameInHebrew(date);
    return `${monthName.slice(0, 3)}${monthName.length > 3 ? "'" : ""}`;
};

export function getWeekDayNameInHebrew(date:Date) {
    switch (date.getDay() + 1) {
        case 1:
            return "ראשון";
        case 2:
            return "שני";
        case 3:
            return "שלישי";
        case 4:
            return "רביעי";
        case 5:
            return "חמישי";
        case 6:
            return "שישי";
        case 7:
            return "שבת";
    };
};

export function getWeekDayShortNameInHebrew(date:Date) {
    switch (date.getDay() + 1) {
        case 1:
            return "א'";
        case 2:
            return "ב'";
        case 3:
            return "ג'";
        case 4:
            return "ד'";
        case 5:
            return "ה'";
        case 6:
            return "ו'";
        case 7:
            return "שבת";
    };
};