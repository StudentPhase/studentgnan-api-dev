'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');

module.exports = {
    getAllEmergencyContacts: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from EmergencyContact WHERE CategoryId = ' + req.params.CategoryId;
        database.connectionString.query(queryString, function(err, rows) {
            if (!err) {
                if (rows.length == 0) {
                    result.Code = statusCodes.errorCodes[0].Code;
                    result.Message = statusCodes.errorCodes[0].Message;
                    result.Data = null;
                } else {
                    result.Code = statusCodes.successCodes[0].Code;
                    result.Message = statusCodes.successCodes[0].Message;
                    result.Data = rows;
                }
                res.send(result);
            } else {
                res.send(err);
            }
        });
    },
    addEmergencyContact: function(req, res) {
        var result = {};
        if (req.body.Name == "") {
            result.Code = statusCodes.errorCodes[1].Code;
            result.Message = statusCodes.errorCodes[1].Message;
            result.Data = null;
            res.send(result);
            return;
        } else {
            var queryString = 'INSERT INTO EmergencyContact SET ?';
            database.connectionString.query(queryString, req.body, function(err, rows) {
                if (!err) {
                    if (rows.length == 0) {
                        result.Code = statusCodes.errorCodes[0].Code;
                        result.Message = statusCodes.errorCodes[0].Message;
                        result.Data = null;
                    } else {
                        result.Code = statusCodes.successCodes[0].Code;
                        result.Message = statusCodes.successCodes[0].Message;
                        result.Data = rows;
                    }
                    res.send(result);
                } else {
                    res.send(err);
                }
            });
        }
    }
};