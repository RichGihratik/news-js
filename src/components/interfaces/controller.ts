export type ControllerCallback<DataType> = (data?: DataType) => void;

export interface IController<DataType, OptionsType = undefined> {
    getData(callback: ControllerCallback<DataType>, options?: Partial<OptionsType>): void;
}
