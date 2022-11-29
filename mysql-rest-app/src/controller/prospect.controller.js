import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/prospect.query.js';

const HttpStatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'}
}
export const getProspects = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching prospects`)
    database.query(QUERY.SELECT_PROSPECTS, (error, results) => {
        if (!results) {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`No Patients found`))
        } else {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`Patients retrieved`, {prospects: results}))
        }
    })
}

export const createProspect = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, creating prospect`)
    database.query(QUERY.CREATE_PROSPECT,Object.values(req.body), (error, results) => {
        if (!results) {
            logger.error(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.OK.status,`Error occurred.`))
        } else {
            const prospect = {id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.OK.status,`Prospects created`, {prospect}))
        }
    })
}

export const getProspect = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching prospect`)
    database.query(QUERY.SELECT_PROSPECT, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.OK.status,`prospect by id ${req.params.id} was not found`))
        } else {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`prospect retrieved`,  results[0]))
        }
    })
}

export const updateProspect = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching prospect`)
    database.query(QUERY.SELECT_PROSPECT, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.OK.status,`prospect by id ${req.params.id} was not found`))
        } else {
            logger.info(`${req.method} ${req.originalurl}, updating prospect`)
            database.query(QUERY.UPDATE_PROSPECT, [...Object.values(req.body),req.params.id], (error, results) => {
                if (!error) {
                    res.status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`prospect updated`,  {id: req.params.id, ...req.body}))
                } else {
                    logger.error(error.message)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.OK.status,`Error occurred.`))
                }
            });
    }
});
};

export const deleteProspect = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, deleting prospect`)
    database.query(QUERY.DELETE_PROSPECT, [req.params.id], (error, results) => {
        if (results.affetedRows > 0 ) {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`Prospect deleted`,  results[0]))
        } else {
            res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.OK.status,`prospect by id ${req.params.id} was not found`))
        }
    })
}


export default HttpStatus;
