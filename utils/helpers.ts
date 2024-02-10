export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const formatPrice = (price: number) => {
    return Intl.NumberFormat('pl', {style:'currency', currency:'PLN'}).format(price)
}