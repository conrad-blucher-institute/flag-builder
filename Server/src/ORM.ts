// -*- coding: utf-8 -*-
//ORM.js
//----------------------------------
// Created By: Matthew Kastl
// Created Date: 10/26/2023
// version 1.0
//----------------------------------
// """This file is an ORM for sqlite
// built for the FlagBuilder
//  """ 
//----------------------------------
//Imports
import { Database } from "sqlite3";
const dotenv = require('dotenv');
dotenv.config();

export class ORM {

    private DB_PATH: string;
    private conn: Database;
    constructor(){
        this.DB_PATH = process.env.DB_PATH!;
        this.conn = new Database(this.DB_PATH, (err) => {
            if(err) { 
                console.error(err.message);
                throw(err.message);
            }
            else console.log('DB connection established...');
        });
    }

    /**
     * Queries a units from the DB to get all the units
     * @returns A ref units rows (ID, code, displayName, notes)
     */
    public getDistinctUnits() {
        return new Promise((resolve, reject) => {
            this.conn.all(`
            SELECT DISTINCT * FROM ref_dataUnit`, 
                (err, rows) => {
                    if(err) {
                        console.error(err.message);
                        reject('err.message');
                    }
                    else if (rows.length <= 0) { //No data
                        return resolve(-1);
                    }
                    else return resolve(rows); //data
                }
            )
        });
    }


    /**
     * Queries a locations from the DB to get all the units
     * @returns A ref location rows (ID, code, displayName, notes, latitude, longitude)
     */
    public getDistinctLocation() {
        return new Promise((resolve, reject) => {
            this.conn.all(`
            SELECT DISTINCT * FROM ref_dataLocation`, 
                (err, rows) => {
                    if(err) {
                        console.error(err.message);
                        reject('err.message');
                    }
                    else if (rows.length <= 0) { //No data
                        return resolve(-1);
                    }
                    else return resolve(rows); //data
                }
            )
        });
    }


    /**
     * Queries a Series from the DB to get all the units
     * @returns A ref series rows (ID, code, displayName, notes)
     */
    public getDistinctSeries() {
        return new Promise((resolve, reject) => {
            this.conn.all(`
            SELECT DISTINCT * FROM ref_dataSeries`, 
                (err, rows) => {
                    if(err) {
                        console.error(err.message);
                        reject('err.message');
                    }
                    else if (rows.length <= 0) { //No data
                        return resolve(-1);
                    }
                    else return resolve(rows); //data
                }
            )
        });
    }


    /**
     * Queries a source  from the DB to get all the units
     * @returns A ref source rows (ID, code, displayName, notes)
     */
    public getDistinctSource() {
        return new Promise((resolve, reject) => {
            this.conn.all(`
            SELECT DISTINCT * FROM ref_dataSource`, 
                (err, rows) => {
                    if(err) {
                        console.error(err.message);
                        reject('err.message');
                    }
                    else if (rows.length <= 0) { //No data
                        return resolve(-1);
                    }
                    else return resolve(rows); //data
                }
            )
        });
    }


    
    /**
     * Queries a datum from the DB to get all the units
     * @returns A ref datum rows (ID, code, displayName, notes)
     */
    public getDistinctDatum() {
        return new Promise((resolve, reject) => {
            this.conn.all(`
            SELECT DISTINCT * FROM ref_dataDatum`, 
                (err, rows) => {
                    if(err) {
                        console.error(err.message);
                        reject('err.message');
                    }
                    else if (rows.length <= 0) { //No data
                        return resolve(-1);
                    }
                    else return resolve(rows); //data
                }
            )
        });
    }
}