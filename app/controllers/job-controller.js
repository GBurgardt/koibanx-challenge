const mongoose = require('mongoose');

const responseService = require('../services/response-service')
const queueService = require('../services/queue-service')
// const excelService = require('../services/excel-service')
const databaseService = require('../services/database-service');


exports.create = async (req, res) => {
    if(!req.file){
        res.status(404).send(
            responseUtils.getErrorResponse('Archivo no encontrado')
        )
        return;
    }

    if(!req.body.mappingFormat){
        res.status(404).send(
            responseUtils.getErrorResponse('Campo mappingFormat no encontrado')
        )
        return;
    }

    // creo el job
    const newJob = await databaseService.createJob({ excelPath: req.file.path, mappingFormat: JSON.parse(req.body.mappingFormat) });
    
    // lo retorno
    return res.send(
        responseService.getSuccessResponse(
            { result: newJob },
            'OK'
        )
    )
    
}

exports.getById = async (req, res) => {
    if(!req.params.idJob){
        res.status(404).send(
            responseUtils.getErrorResponse('Idjob no encontrado')
        )
        return;
    }

    // Pasa el parámetro query opcional "excelJson" a boolean
    const includeExcelJson = (req.query.excelJson == 'true');

    const job = await databaseService.getJobById({ idJob: req.params.idJob, includeExcelJson });
    
    // lo retorno
    return res.send(
        responseService.getSuccessResponse(
            { result: job },
            'OK'
        )
    )
    
}