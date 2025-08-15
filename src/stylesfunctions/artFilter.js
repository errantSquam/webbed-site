
const getFilteredArtIncludes = (portfolioJson, selectedFilters) => {
    if (selectedFilters.include.length === 0) {
        return Object.keys(portfolioJson)
    }

    return Object.keys(portfolioJson).filter((filename) => {

        return selectedFilters.include.every((tag) => {
            return portfolioJson[filename].tags.includes(tag.value)
        })
    })
}

const getFilteredArt = (portfolioJson, selectedFilters) => {
    let includedArt = getFilteredArtIncludes(portfolioJson, selectedFilters)
    if (selectedFilters.exclude.length === 0) {
        return includedArt
    }

    return includedArt.filter((filename) => {

        return selectedFilters.exclude.every((tag) => {
            return !portfolioJson[filename].tags.includes(tag.value)
        })
    })

}

const getFilteredArtByDate = (portfolioJson, selectedFilters) => {
    return getFilteredArt(portfolioJson, selectedFilters).toSorted((a, b) => portfolioJson[b].date - portfolioJson[a].date)
}

export const getFilteredArtByPriority = (portfolioJson, selectedFilters) => {
    return getFilteredArtByDate(portfolioJson, selectedFilters).toSorted((a, b) => {
        let artArray = [portfolioJson[a], portfolioJson[b]]
        let compareArray = [0, 0]

        for (let i = 0; i < 2; i++) {
            if (artArray[i].tags.includes("complexbg")) {
                compareArray[i] += 1
            } else if (artArray[i].tags.includes("simplebg")) {
                compareArray[i] += 0.5
            }
            if (artArray[i].tags.includes("mecha")) {
                compareArray[i] += 3
            }
            if (artArray[i].tags.includes("fullbody")) {
                compareArray[i] += 2
            } else if (artArray[i].tags.includes("halfbody")) {
                compareArray[i] += 1
            } else if (artArray[i].tags.includes("chibi")) {
                compareArray[i] -= 2
            }
            if (artArray[i].tags.includes("animated")) {
                compareArray[i] += 2
            }
            if (artArray[i].tags.includes("wings")) {
                compareArray[i] += 1
            }
            if (artArray[i].tags.includes("oc")) {
                compareArray[i] += 1
            } else if (artArray[i].tags.includes("fanart")) {
                compareArray[i] -= 1
            }

            if (artArray[i].tags.includes("charactersheet")) {
                compareArray[i] += 1
            }

            if (artArray[i].tags.includes("3d")) {
                compareArray[i] -=4 //good lord the loading times
            }

            compareArray[i] += artArray[i].priority
        }

        return compareArray[1] - compareArray[0]
    })
}