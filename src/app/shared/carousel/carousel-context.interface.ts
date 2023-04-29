export interface ICarouselContext<T> {
	$implicit: T;
	img: T;
	appCarouselOf: T[];
	index: number;
	next: () => void;
	back: () => void;
}
