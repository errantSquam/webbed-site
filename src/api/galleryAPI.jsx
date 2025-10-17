
import { useQuery } from '@tanstack/react-query'
import { convertTagToSelectLabel, handleFilterParams } from "../stylesfunctions/apiFilter"

export function portfolioData(){
    const result = useQuery({
        queryKey: ["portfolioData"],
        queryFn: async () => {
            const data = fetch('assets/portfolio.json').then((res) => res.json())
            return data
        }

    })

    return result

}

export function portfolioTagData(){
    const result = useQuery({
        queryKey: ["portfolioTagData"],
        queryFn: async () => {
            const data = fetch('assets/portfoliotags.json').then((res) => res.json())
            return data
        }
    })
    return result
}

export function groupTagData(){
    const result = useQuery({
        queryKey: ["groupTagData"],
        queryFn: async () => {
            const data = fetch('assets/grouptags.json').then((res) => res.json())
            return data
        }
    })
    return result
}