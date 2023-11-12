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

export class ServerComms {
    private ServerEndpoint: string = 'http://localhost:8000';

    constructor(ServerEndpoint: string){
        this.ServerEndpoint = ServerEndpoint;
    }


    /**
     * Requests variable from the DB
     * @returns A ref source rows (ID, code, displayName, notes)
     */
    public async requestVariable(variable: string){
        let response = await fetch(`${this.ServerEndpoint}\\${variable}`);

        let data = await response.json()
        
        return data;
    }
}