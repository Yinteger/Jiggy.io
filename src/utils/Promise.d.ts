/*
    This provides an easier interface to use Promises' resolve/reject functions in Typescript,

    Since the base typings for Promises doesn't expose an actual interface type for the Resolve/Reject functions.
*/

interface ResolveFunction<T> {
	(value: T | PromiseLike<T>): void;
}

interface RejectFunction {
    (reason?: any): void;
}
