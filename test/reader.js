/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:45 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Reader = require(__dirname + '/../index').Reader;

var adtPath = 'samples/adt.hl7';
var oruPath = 'samples/oru.hl7';

//
/// JSON Parsing
fs.readFile(path.join(__dirname, adtPath), function (err, buffer) {
    console.time('ADT_Time');
    var reader = new Reader('JSON');

    //reader.read(buffer.toString(), 'MSH PID [{NK1}] PV1 [PV2]', function (err, hl7Data, hl7Json) {
    reader.read(buffer.toString(), function (err, hl7Data, hl7Json) {
        console.log(err);

        if (!err) {
            var patientName = hl7Json['PID'][5];
            console.log('ADT->Patient name: ', patientName);
        }

        console.timeEnd('ADT_Time');
    });
});

fs.readFile(path.join(__dirname, oruPath), function (err, buffer) {
    console.time('ORU_Time');

    var reader = new Reader();

    reader.read(buffer.toString(), 'MSH PID [{OBR {OBX}}]', function (err, hl7Data, hl7Json) {
        console.log(err);

        if (!err) {
            var patientName = hl7Json['PID'][5]; /// Similar pattern: hl7Json['PID'].fields[5].value ==> For advanced usage
            console.log('ORU->Patient name: ', patientName);

            /// Reading Header fields
            var messageType = hl7Data.mshSegment.messageType;
            console.log('MSH->Message Type: ', messageType);
        }

        console.timeEnd('ORU_Time');
    });
});