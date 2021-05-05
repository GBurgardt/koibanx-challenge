const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const async = require("async");
const { queueConstant } = require('../constants/queue-constants');
const { statesJobsConstants } = require('../constants/statesjob-constants');
const excelService = require('./excel-service')

const queue = async
    .queue(
        async (task, callback) => {
            await Job.updateOne({ _id: task.job._id }, { state: statesJobsConstants.processing });

            try {
                console.log(`- Procesando Job. Archivo: ${task.job.excelPath}`)

                const processResponse = await excelService.processExcel(task.job);

                await Job.updateOne(
                    { _id: task.job._id }, 
                    { 
                        formatErrors: processResponse.errors,
                        excelJson: processResponse.json,
                        state: statesJobsConstants.done
                    }
                );

            } catch (err) {
                console.log("err")
                console.log(err)
                console.log("fin err")
                await Job.updateOne({ _id: task.job._id }, { state: statesJobsConstants.pending })
                return callback(err);
            }


        }, 
        queueConstant.maxWorkers
    )

/**
 * Busca Jobs en estado "Pending", y los procesa
 */
const updateQueue = async() => {
    console.log("Buscando Jobs pendientes..")

    const pendingJobs = await Job
        .find({ state: statesJobsConstants.pending })
        .limit(queueConstant.pendingLimit);

    pendingJobs.forEach(
        job => queue
            .push(
                { job },
                err => err ? console.log(err) : null
            )
    )
}

module.exports = {
    updateQueue
}