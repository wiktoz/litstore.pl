import 'server-only'

interface Dict {
    [key:string]: any
}

const dictionaries:Dict = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    pl: () => import('@/dictionaries/pl.json').then((module) => module.default),
    de: () => import('@/dictionaries/de.json').then((module) => module.default),
    fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale:string) => dictionaries[locale]()