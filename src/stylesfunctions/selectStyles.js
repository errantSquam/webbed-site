import tagsColorDict from "./tagsColorDict"

export const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'black',
        borderColor: 'var(--color-zinc-500)',
        color: "white"

    }),
    menu: (menuStyles, state) => ({
        ...menuStyles,
        backgroundColor: state.isFocused ? 'var(--color-zinc-800)' : 'black',

    }),

    input: (inputStyles, state) => ({
        ...inputStyles,
        backgroundColor: 'black',
        color: "white"
    }),
    
    multiValue: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color: "white"
        }
    },
    multiValueLabel: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color: "white"
        }
    },
    option: (styles, { data }) => {


        return {
            ...styles,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            ":hover": {
                backgroundColor: "rgba(146, 146, 146, 0.5)"
            }

        }
    },
    groupHeading: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.label]})`.replace("bg", "color")
        return {
            ...styles,
            color: "white"
        }
    },
    group: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.label]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color: "white",
            paddingBottom: 0
        }
    },

}

export const selectStylesExclude = () => {
    let excludeStyles = { ...selectStyles }

    let bgColor = `var(--color-red-900)`
    let textColor = `white`
    excludeStyles.multiValueLabel = (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            borderStyle: "hidden",
            borderColor: colorvar,
            borderWidth: "3px",
            borderLeftStyle: "solid",
            backgroundColor: bgColor,
            color: textColor
        }
    }

    excludeStyles.multiValue = (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            borderStyle: "solid",
            borderColor: colorvar,
            borderWidth: "3px",
            borderLeftStyle: "hidden",
            backgroundColor: bgColor,
            color: textColor
        }
    }


    return excludeStyles
}