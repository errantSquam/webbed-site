
import { useQuery } from '@tanstack/react-query'
import { convertTagToSelectLabel, handleFilterParams } from "../stylesfunctions/apiFilter"
import { useSearchParams } from 'react-router-dom'
import handleUrlQuery from '../stylesfunctions/handleUrlQuery'
import { useGallery } from '../components/galleryContext'

export function portfolioData() {
    const result = useQuery({
        queryKey: ["portfolioData"],
        queryFn: async () => {
            const data = fetch('assets/portfolio.json').then((res) => res.json())
            return data
        }

    })
    return result

}

export function portfolioTagData() {
    const result = useQuery({
        queryKey: ["portfolioTagData"],
        queryFn: async () => {
            const data = fetch('assets/portfoliotags.json').then((res) => res.json())
            return data
        }
    })
    return result
}

export function groupTagData() {
    const result = useQuery({
        queryKey: ["groupTagData"],
        queryFn: async () => {
            const data = fetch('assets/grouptags.json').then((res) => res.json())
            return data
        }
    })
    return result
}

export function handlePageViaSearchParams() {
    const searchParams = new URLSearchParams(window.location.search)

    let paramPage = searchParams.get("page")
    if (paramPage === null || isNaN(paramPage)) {
        paramPage = 1

        searchParams.append("page", 1)
    }
}

//todo: move handlefilterparams helper to be same place as here, or vice versa?
export function handlePageFilters(portfolioTagData, searchParams = new URLSearchParams(window.location.search)) {
    let tempSelectedFilters = ["include", "exclude"]
        .reduce((accumulator, filterType) => {
            return (handleFilterParams(filterType, accumulator, portfolioTagData, searchParams))
        }, {
            include: [],
            exclude: []
        })


    new Array("include", "exclude").forEach((filterType) => {
        if (tempSelectedFilters[filterType] === null) {
            return
        }
        if (tempSelectedFilters[filterType].length === 0) {
            searchParams.delete(filterType)
        }
    })

    return tempSelectedFilters
}

export function writeTagsToParams(selectedFilters) {
    const searchParams = new URLSearchParams(window.location.search)

    let tempSelectedFilters = { ...selectedFilters }
    let includeFilters = tempSelectedFilters.include
    let excludeFilters = tempSelectedFilters.exclude


    function handleFilter(filter) {
        let tempValue = filter.value
        tempValue = tempValue.split(" ").join("+")
        return tempValue
    }

    includeFilters = includeFilters.map((filter) => {
        return handleFilter(filter)
    })

    excludeFilters = excludeFilters.map((filter) => {
        return handleFilter(filter)
    })

    includeFilters = includeFilters.join(",")
    excludeFilters = excludeFilters.join(",")

    let urlString = window.location.search
    urlString = handleUrlQuery(urlString, "include", includeFilters)
    urlString = handleUrlQuery(urlString, "exclude", excludeFilters)


    console.log(urlString)
    history.pushState({}, "Gallery", urlString)

    /*
    if (includeFilters !== "") {
        searchParams.append("include", includeFilters)
    }
    if (excludeFilters !== "") {
        searchParams.append("exclude", excludeFilters)
    }*/

}
