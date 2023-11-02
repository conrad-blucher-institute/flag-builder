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
    private ServerEndpoint: string = 'http://localhost:8000'; // Idk the type yet so string for now

    constructor(ServerEndpoint: string){
        this.ServerEndpoint = ServerEndpoint;
    }


    /**
     * Requests units from the DB
     * @returns A ref source rows (ID, code, displayName, notes)
     */
    public async requestUnits(){
        //let orm = new ORM();

        //let units = orm.getDistinctUnits();

        let units = 'meter';

        let response = await fetch(`${this.ServerEndpoint}\\units`);
        let data = await response.json()
        return data;
    }
}