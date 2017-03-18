import { Observable } from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';



@Injectable()
export class MissionService{
    constructor(){}
    public instruction: string = "This is a Demo Instruction from Mission Service";

    setInstructions(ins: string){
        this.instruction = ins;
    }
    getInstructions(){
        return this.instruction;
    }
}
