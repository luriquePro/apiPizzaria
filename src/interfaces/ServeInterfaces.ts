import { App } from "../app";

interface IServer extends IServerMethods, IServerParams {}

interface IServerParams {
	application: App;
	port: string;
}

interface IServerMethods {
	run(): void;
}

export { IServer };
