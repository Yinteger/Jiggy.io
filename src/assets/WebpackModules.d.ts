//Unfortunately typescript doesn't expect regex expressions here.

//So for any extension we want to support, we will need a *.ext module that exports a default value of any.

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.json';

// declare module '*.png' {
//     const value: string;
//     export default value as string;
// }

// declare module '*.jpg' {
//     const value: string;
//     export default value as string;
// }

// declare module '*.jpeg' {
//     const value: string;
//     export default value as string;
// }

// declare module '*.svg' {
//     const value: string;
//     export default value as string
// }

// declare module '*.gif' {
//     const value: string;
//     export default value as string;
// }

// declare module '*.json' {
//     const value: any;
//     export default value;
// }
