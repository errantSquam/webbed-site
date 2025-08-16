import { React, useState } from "react"
import Select from "react-select"
import "../stylesfunctions/typeStyle.css"


export const TagBlock = ({ tagData, tagsColorDict }) => {
    return <span className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</span>
}

export const GallerySelect = ({ onChange, styles, options, value }) => {
    const formatGroupLabel = (data) => (
        <div>
            <span>{data.label}</span>
        </div>
    );

    return <Select
        onChange={onChange}
        styles={styles}
        components={{ IndicatorSeparator: () => null }}
        options={options}
        formatGroupLabel={formatGroupLabel} key={options}
        value={value}
        placeholder="Type to search..."
        isMulti
    />
}

export const GalleryFilter = ({ title, onChange, styles, options, value }) => {
    return <div className="flex flex-col w-full">
        <div className="text-green-400 font-pirulen">{title}</div>
        <div className=" text-left text-sm">
            <GallerySelect
                onChange={onChange}
                styles={styles}
                options={options}
                value={value}
            />
        </div>
    </div>
}
