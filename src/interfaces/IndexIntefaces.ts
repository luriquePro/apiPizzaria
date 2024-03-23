interface IIndexServices {
	index(message?: string): Promise<string>;
}

export { IIndexServices };
