export const TagBlock = ({ tagData, tagsColorDict }) => {
    return <span className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</span>
}
