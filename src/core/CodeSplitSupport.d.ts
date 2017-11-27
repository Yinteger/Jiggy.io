// interface NodeEnsureRequire extends NodeRequire {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// }

interface NodeRequire {
    ensure: (paths: string[], callback: (require: <NodeRequire>(path: string) => NodeRequire) => void) => void;
}

declare var require: NodeRequire;
