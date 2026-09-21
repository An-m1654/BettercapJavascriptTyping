export type JSRequest = {
    Client: {
        "IP": string,
        "MAC": string,
        "Alias": string
    }
    Method: string
    Version: string
    Scheme: string
    Path: string
    Query: string
    Hostname: string
    Port: string
    ContentType: string
    Headers: string
    Body: string

    NewHash(): string
    UpdateHash(): void
    WasModified(): boolean
    CheckIfModifiedAndUpdateHash(): boolean
    /**
     * @param name case-insensitive name
     * @param deflt default value if requested header doesn't exist
     */
    GetHeader(name: string, deflt: string): string
    /**
     * @param name case-insensitive name
     */
    GetHeaders(name: string): string[]
    SetHeader(name: string, value: string): void
    RemoveHeader(name: string): void
    ReadBody(): string
    ParseForm(): Object
    /** @returns golang {@link https://pkg.go.dev/net/http#Request http.Request} */
    ToRequest(): Object
};

export type JSResponse = {
    Status: number,
    ContentType: string,
    Headers: string,
    Body: string

    NewHash(): string
    UpdateHash(): void
    WasModified(): boolean
    CheckIfModifiedAndUpdateHash(): boolean
    /**
     * @param name case-insensitive name
     * @param deflt default value if requested header doesn't exist
     */
    GetHeader(name: string, deflt: string): string
    /**
     * @param name case-insensitive name
     */
    GetHeaders(name: string): string[]
    SetHeader(name: string, value: string): void
    RemoveHeader(name: string): void
    ClearBody(): void
    /**
     * @param req golang {@link https://pkg.go.dev/net/http#Request http.Request}
     * @returns golang {@link https://pkg.go.dev/net/http#Response http.Response}
     */
    ToResponse(req: Object): Object
    ReadBody(): string
};

// THIS IS NOT FILLED IN COMPLETELY
export type httpResponse = {
    Error: Object,
    Response: undefined,
    Raw: Object,
    Body: string,
    JSON: undefined
}

// THIS IS NOT FILLED IN COMPLETELY
export type Session = {
    Options: object,
    Interface: object,
    Gateway: object,
    Env: object,
    Lan: object,
    WiFi: object,
    BLE: object,
    HID: object,
    CAN: object,
    Queue: object,
    StartedAt: object,
    Active: boolean,
    GPS: object,
    Modules: object,
    Aliases: object,

    Input: object,
    Prompt: object,
    CoreHandlers: object,
    Events: object,
    EventsIgnoreList: object,
    UnkCmdCallback: function,
    Firewall: object,

    BLECompleter: function,
    Close: function,
    EventsCompleter: function,
    FindMAC: function,
    HIDCompleter: function,
    IsOn: function,
    LANCompleterForIPs: function,
    LANCompleterForMacs: function,
    Lock: function,
    MarshalJSON: function,
    Module: function,
    ReadLine: function,
    Refresh: function,
    Register: function,
    Run: function,
    RunCaplet: function,
    Skip: function,
    Start: function,
    Unlock: function,
    WiFiCompleter: function,
    WiFiCompleterFull: function
}

export type Graph = {
    static IsConnected(nodeType: any, nodeID: string): boolean;
}

declare global {
    /* #region generic bettercap js (from js/* where js/init.go is the start) */
    /* #region fs.go */
    function mkdirAll(filename: string): void;
    function readDir(filename: string): void;
    function readFile(filename: string): void;
    function writeFile(filename: string, data: string): void;
    function appendFile(filename: string, data:string): void;
    /* #endregion */
    /* #region log.go */
    function log(...text: any[]): void;
    function log_debug(...text: any[]): void;
    function log_info(...text: any[]): void;
    function log_warn(...text: any[]): void;
    function log_error(...text: any[]): void;
    function log_fatal(...text: any[]): void;
    /* #endregion */
    /* #region crypto.go */
    declare class Crypto {
        static sha1(input: string): string;
    }
    /* #endregion */
    /* #region data.go */
    function btoa(text: string): string;
    function atob(base64: string): string;
    function gzipCompress(text: string): string;
    function gzipDecompress(gzipData: string): string;
    function textEncode(text: string): string;
    function textDecode(encodedText: string): string;
    /* #endregion */
    /* #region http.go */
    function httpRequest(method: string, url: string): {body: string};
    function httpRequest(method: string, url: string, data: string): {body: string};
    function httpRequest(method: string, url: string, data: string, headers: Object): {body: string};
    declare class http {
        static Encode(text: string): string;
        static Request(method: string, uri: string, headers: Object, form: Object, json: string): httpResponse;
        static Get(url: string, headers: Object): httpResponse;
        static PostForm(url: string, headers: Object, form: Object): httpResponse;
        static PostJSON(url: string, headers: Object, json: string): httpResponse;
    }
    /* #endregion */
    /* #region random.go */
    declare class random {
        static String(size: number, charset: string): string;
        static Mac(): string;
    }
    /* #endregion */
    /* #endregion */

    /* #region bettercap js declared in session/session.go */
    /** @description Environment getter */
    function env(varName: string): any;
    /** @description Environment setter */
    function env(varName: string, varValue: string): void;
    function run(fileName: string): void;
    function fileExists(fileName: string): boolean;
    function loadJSON(fileName: string): Object;
    /** @description I infact did NOT flip fileName and json. That's what's written in the golang declaration. I know, it's very weird. */
    function saveJSON(json: Object, fileName: string): void;
    function saveToFile(fileName: string, data: string): void;
    /** @description for ALL events */
    function onEvent(listener: function): void;
    /** @description for a specific event */
    function onEvent(eventName: string, listener: function): void;
    /** @description for ALL events */
    function removeEventListener(listener: function): void;
    /** @description for a specific event */
    function removeEventListener(eventName: string, listener: function): void;
    const session: Session;
    /* #endregion */

    /* #region From modules/graph/module.go */
    const graph: Graph;
    /* #endregion */

    // http proxy specific
    const env: Object
    function addSessionEvent(tag: string, data: any): boolean;
}

// For reference
export function onLoad(): void;
export function onRequest(req: JSRequest, res: JSResponse): void;
export function onResponse(req: JSRequest, res: JSResponse): void;
export function onCommand(cmd: string): void;