
export default function getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const today = new Date();
    return `Today, ${today.toLocaleDateString('en-GB', options)}`;
}

