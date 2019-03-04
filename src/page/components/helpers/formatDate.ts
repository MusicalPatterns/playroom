const formatDate: (date: string) => string =
    (date: string): string =>
        new Date(date).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

export {
    formatDate,
}
