import { ClientSession, ObjectId } from "mongoose";
import { ITablePosition } from "../@types/Table";
import { IQueryFilter, IQueryOptions } from "./QueryFilterInterface";

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
	name: string;
	number: number;
	description: string;
	capacity: number;
	position?: ITablePosition;
	near_windows: boolean;
	near_power_outlets: boolean;
}

interface ITableCreateRepository extends ITableCreate {}

interface ITableCreateReturn extends ITable {}

interface ITableFind {}
interface ITableListAllReturn {
	id: string;
	name: string;
	number: number;
	description: string;
	capacity: number;
	position: ITablePosition;
	near_windows: boolean;
	near_power_outlets: boolean;
}

interface ITableRepository {
	create(dataCreate: ITableCreateRepository, session?: ClientSession): Promise<ITable>;
	findByObj(dataFind: ITableFind): Promise<ITable[] | null>;
	findOneByObj(dataFind: ITableFind): Promise<ITable | null>;
	update(dataFilter: ITableFind, dataUpdate: ITableUpdate, session?: ClientSession): Promise<ITable | null>;
	listAll(options: IQueryOptions): Promise<ITableListAllReturn[]>;
}

interface ITableUpdate {}
interface ITableServices {
	create(dataCreate: ITableCreate): Promise<string>;
	listAll(dataQueryFilter: IQueryFilter): Promise<ITableListAllReturn[]>;
}

interface ITableValidator {
	create(dataCreate: ITableCreate): void;
}

export {
	ITable,
	ITableCreate,
	ITableCreateRepository,
	ITableCreateReturn,
	ITableFind,
	ITableListAllReturn,
	ITableRepository,
	ITableServices,
	ITableUpdate,
	ITableValidator,
};
