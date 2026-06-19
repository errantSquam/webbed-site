import { expect, test, describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { handlePageFilters } from '../api/galleryAPI'
import App from '../App'

test('adds 6 + 7 to equal 13', () => {
    expect(6 + 7).toBe(13)
})

it("Site renders properly", () => {
    render(<App />)
})

describe("Gallery", async () => {

    const portfolioTagData = await fetch(window.location + '/assets/portfoliotags.json').then((response) => response.json())

    it("pulls portfolio data properly", () => {
        //given
        expect(portfolioTagData["oc"]).toStrictEqual(
            { fullName: 'Original Character', tagType: 'copyright' }
        )
        //maybe add more tests for different tags 

    })

    it("renders tags properly", () => {
        const sampleTags = new URLSearchParams("?include=irl&exclude=human")
        expect(handlePageFilters(portfolioTagData, sampleTags)).toStrictEqual(
            {
                include: [{
                    "label": "Realism",
                    "tagType": "copyright",
                    "value": "irl",
                },],
                exclude: [{
                    "label": "Human",
                    "tagType": "charatype",
                    "value": "human",
                }]
            }
        )
    })
}
)
