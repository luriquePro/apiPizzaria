export type DefaultLogs = (error: string, message: string, statusCode: number, entityId: unknown) => Promise<unknown>;

export interface IHelperErrors {}
export interface IHelperLogs {
	debug: DefaultLogs;
	info: DefaultLogs;
	error: DefaultLogs;
}
