export default abstract class LogicEngine {
	abstract addLogic (id : string, logicMethod: () => {}, interval : number) : void;
	abstract pauseLogic (id: string) : void;
	abstract resumeLogic (id: string) : void;
	abstract removeLogic (id: string) : void;
	abstract start () : boolean;
	abstract stop () : void;
}