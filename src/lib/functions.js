export const getUrlValue = (param) => {
    let name = param.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(document.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const formatSizeFile = bytes => {
    if (bytes >= 1073741824) bytes = (bytes / 1073741824).toFixed(2) + " GB" 
    else if (bytes >= 1048576) bytes = (bytes / 1048576).toFixed(2) + " MB"
    else if (bytes >= 1024) bytes = (bytes / 1024).toFixed(2) + " KB"
    else if (bytes > 1) bytes = bytes + " bytes"
    else if (bytes === 1) bytes = bytes + " byte"
    else bytes = "0 bytes"
    return bytes
}