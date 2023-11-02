// -*- coding: utf-8 -*-
//ServerComms.ts
//----------------------------------
// Created By: Beto Estrada
// Created Date: 11/01/2023
// version 1.0
//----------------------------------
// """This file holds code for server communications between
// the client and the database for Flag Builder
// """ 
//----------------------------------
// Imports
//import {ORM} from "./ORM"

export class ServerComms {
    private ServerEndpoint: string; // Idk the type yet so string for now

    constructor(ServerEndpoint: string){
        this.ServerEndpoint = ServerEndpoint;
    }

    public requestUnits(){
        return new Promise((resolve, reject) => {
            //let orm = new ORM();

            //let units = orm.getDistinctUnits();

            let units = 'meter';

            return resolve(units);
        });
    }
}