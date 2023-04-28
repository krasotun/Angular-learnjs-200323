export interface IPaginationContext<T> {
	$implicit: T[];
	appPaginationOff: T[];
	index: number;
	pageIndexes: number[];
	next: () => void;
	back: () => void;
	selectIndex: (index: number) => void;
}
