export default interface HttpServer {
    on(method: string, url: string, schema: any, callback: Function): void;
    listen(port: number): void
}