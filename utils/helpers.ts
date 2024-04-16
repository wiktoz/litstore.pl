export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const formatPrice = (price: number) => {
    return Intl.NumberFormat('pl', {style:'currency', currency:'PLN'}).format(price)
}

export const formatDate = (date:string) => {
    return new Date(date).toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle: 'short'});
}