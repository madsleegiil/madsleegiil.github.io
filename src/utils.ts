export function formatDateReadable(dateString: string): string {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat(navigator.language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(date);
}