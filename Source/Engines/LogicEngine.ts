export abstract class LogicEngine {
	public abstract addLogic (id : string, logicMethod: () => void, interval : number) : void;
	public abstract pauseLogic (id: string) : void;
	public abstract resumeLogic (id: string) : void;
	public abstract removeLogic (id: string) : void;
}