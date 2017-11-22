//Unfortunately typescript doesn't expect regex expressions here.

//So for any extension we want to support, we will need a *.ext module that exports a default value of any.

//Images
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

//Data structures
declare module '*.json';

//Audio
declare module '*.mp3';
declare module "*.mid";
