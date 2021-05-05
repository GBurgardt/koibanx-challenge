const getSuccessResponse = (result, message = 'Ok') => ({
    status: 0,
    message,
    result
})

const getErrorResponse = (message = 'Error desconocido', error = null) => ({
    status: -1,
    message,
    result: error
})

module.exports = {
    getSuccessResponse,
    getErrorResponse
}