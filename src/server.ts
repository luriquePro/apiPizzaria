import moment from "moment";

import { App } from "./app";
import { IServer } from "./interfaces/ServeInterfaces";

class Server implements IServer {
	public application: App;
	public port: string;

	constructor() {
		this.application = new App();
		this.port = process.env.PORT as string;
	}

	public run() {
		this.application.express.listen(this.port, () => {
			console.log(`Server is running in port ${this.port}. Started of ${moment().utc().toDate()}`);
		});
	}
}

const SERVER = new Server();
SERVER.run();
