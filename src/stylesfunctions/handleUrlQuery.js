export default function handleUrlQuery(urlString, paramName, data) {
    let paramString = `${paramName}=`
    if (data === "") {
        urlString = urlString.replace(new RegExp(`&${paramName}=([^&]*)`), ``)
        urlString = urlString.replace(new RegExp(`${paramName}=([^&]*)`), ``)

    } else if (urlString.includes(paramString)) {
        urlString = urlString.replace(new RegExp(`&${paramName}=([^&]*)`), `&${paramName}=${data}`)
        urlString = urlString.replace(new RegExp(`${paramName}=([^&]*)`), `${paramName}=${data}`)

    } else {
        urlString += "&" + paramString + data
    }
    return urlString
}