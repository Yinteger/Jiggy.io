export interface LogicEngine {
	addLogic (id : string, logicMethod: () => {}, interval : number) : void;
	pauseLogic (id: string) : void;
	resumeLogic (id: string) : void;
	removeLogic (id: string) : void;
	start () : boolean;
	stop () : void;
}