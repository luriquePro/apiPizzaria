import { ObjectId } from "mongoose";
import { ITablePosition } from "../@types/Table";

interface ITable {
	_id: ObjectId;
	id: string;
	name: string;
	number: number;
	description: string;
	capacity: number;
	position: ITablePosition;
	near_windows: boolean;
	near_power_outlets: boolean;
	status: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface ITableCreate {
	name: string; //TODO:  Front não deve passar o nome da mesa, já passar por padrão MESA ${number}
	number: number;
	description: string;
	capacity: number;
	position: ITablePosition;
	near_windows: boolean;
	near_power_outlets: boolean;
}

interface ITableCreateRepository extends ITableCreate {}

interface ITableCreateReturn extends ITable {}

export { ITable, ITableCreate, ITableCreateRepository, ITableCreateReturn };
