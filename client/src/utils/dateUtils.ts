const formatDate = (dateString: string | undefined): string => {
    // Handle undefined input
    if (dateString === undefined) {
        return '';  // or return a default date string if you prefer
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return ''; // or return a default date string if you prefer
    }

    // Get the local date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `"${year}-${month}-${day}"`;
};

export { formatDate };