export const convertTagToSelectLabel = (tagName, portfolioData) => {
    return {
        value: tagName,
        label: portfolioData[tagName].fullName,
        "tagType": portfolioData[tagName].tagType
    }
}

export const handleFilterParams = (filterType, selectedFilters, portfolioTagData, searchParams) => {
    let paramFilter = searchParams.get(filterType)
    let tempSelectedFilters = selectedFilters
    if (paramFilter !== null) {
        paramFilter = paramFilter.split(",")
        tempSelectedFilters[filterType] = paramFilter.map((filterName) => {
            try {
                return convertTagToSelectLabel(filterName, portfolioTagData)
            } catch (error) {
                console.log(filterName)
                console.log("dame da error")
                console.log(error)

            }
        }).filter((filterName) => {
            return filterName !== undefined
        })
    }
    return tempSelectedFilters
}
