export const convertTagToSelectLabel = (tagName, portfolioData) => {
    return {
        value: tagName,
        label: portfolioData[tagName].fullName,
        "tagType": portfolioData[tagName].tagType
    }
}

export const handleFilterParams = (filterType, tempSearchParams, selectedFilters) => {
    let paramFilter = tempSearchParams.get(filterType)
    let tempSelectedFilters = selectedFilters
    if (paramFilter !== null) {
        paramFilter = paramFilter.split(",")

        tempSelectedFilters[filterType] = paramFilter.map((filterName) => {
            try {
                return convertTagToSelectLabel(filterName, portfolioTagData)
            } catch {

            }
        }).filter((filterName) => {
            return filterName !== undefined
        })
    }
    return tempSelectedFilters 
}
