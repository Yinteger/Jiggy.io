//Unfortunately typescript doesn't expect regex expressions here.

//So for any extension we want to support, we will need a *.ext module that exports a default value of any.

declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.jpeg' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: any;
    export default value;
}

declare module '*.gif' {
    const value: any;
    export default value;
}

declare module '*.json' {
    const value: any;
    export default value;
}
