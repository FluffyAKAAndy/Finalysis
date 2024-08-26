export function displayDollars(number: number) {
    if (Math.round((number * 100) / 100) >= 0)
    {
        return "$" + (Math.round(number * 100) / 100).toString();
    }
    if ((Math.round(number * 100) / 100) < 0)
    {
        return "-$" + (Math.round(number * -1 * 100) / 100).toString();
    }
}

export function firstOfTheMonth(date: Date) {
    date.setHours(0, 0, 0, 0);
    var month = date.getMonth();
    var year = date.getFullYear();
    return new Date(year, month, 1);
}
