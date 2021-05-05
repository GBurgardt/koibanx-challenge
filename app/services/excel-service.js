const XLSX = require('xlsx');

/**
 * Convierte el excel a json
 */
const processExcel = (job) => {
    const workbook = XLSX.readFile(job.excelPath);
    const sheet_name_list = workbook.SheetNames;

    return new Promise((resolve, reject) => {
        try {
            const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            const { mappingFormat } = job;
            const resp = processMapingFormat(jsonResult, mappingFormat);
            resolve(resp);
        }
        catch (err) {
            reject(err)
        }
    });
}

/**
 * Procesa el formato de mapeo, busca los errores
 */
const processMapingFormat = (jsonResult, mappingFormat) => {
    // "mappingFormat" viene en formato { A:.., B:.., C:...,}. Entonces tomo el array de values que ya está en orden
    const valuesMappingFormat = Object.values(mappingFormat);

    let errors = [];

    const json = jsonResult
        .map(
            (r, indRow) => {
                let resp = {};
                let rowErrors = [];

                valuesMappingFormat
                    .forEach(
                        (mappingObj, indColumn) => {
                            const valueRow = r[Object.keys(r)[indColumn]];

                            if (typeof valueRow !== mappingObj.type) {
                                rowErrors = rowErrors.concat({
                                    row: indRow + 2, column: indColumn + 1, error: `El tipo de dato es incorrecto. Debería ser ${mappingObj.type}, pero es ${typeof valueRow}`
                                })
                            }

                            resp[mappingObj.name] = valueRow;
                        }
                    );

                errors = errors.concat(rowErrors)

                return resp
            }
        );

    return { json, errors }
}

module.exports = {
    processExcel,
    processMapingFormat
}