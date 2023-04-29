import {
	Directive,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {ICarouselContext} from './carousel-context.interface';

@Directive({
	selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnInit, OnChanges, OnDestroy {
	@Input()
	appCarouselOf: T[] | undefined | null;

	private readonly currentIndexSubject$ = new BehaviorSubject<number>(0);
	private readonly destroySubject$ = new Subject<boolean>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<ICarouselContext<T>>,
	) {}

	ngOnChanges({appCarouselOf}: SimpleChanges): void {
		if (appCarouselOf) {
			this.updateView();
		}
	}

	ngOnInit(): void {
		this.listenCurrentIndexChange();
	}

	ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}

	private updateView(): void {
		if (!this.appCarouselOf?.length) {
			this.viewContainerRef.clear();
			return;
		}
		this.currentIndexSubject$.next(0);
	}

	private listenCurrentIndexChange(): void {
		this.currentIndexSubject$
			.pipe(
				map(currentIndex => this.getCurrentContext(currentIndex)),
				filter(Boolean),
				takeUntil(this.destroySubject$),
			)
			.subscribe(context => {
				this.viewContainerRef.clear();
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);
			});
	}

	private getCurrentContext(currentIndex: number): ICarouselContext<T> | null {
		if (!this.appCarouselOf) {
			return null;
		}
		return {
			$implicit: this.appCarouselOf[currentIndex],
			img: this.appCarouselOf[currentIndex],
			index: currentIndex,
			appCarouselOf: this.appCarouselOf,
			next: () => {
				this.next();
			},
			back: () => {
				this.back();
			},
		};
	}

	private next() {
		const nextIndex = this.currentIndexSubject$.value + 1;
		const newIndex = nextIndex < (this.appCarouselOf as T[]).length ? nextIndex : 0;

		this.currentIndexSubject$.next(newIndex);
	}

	private back() {
		const previousIndex = this.currentIndexSubject$.value - 1;
		const newIndex =
			previousIndex >= 0 ? previousIndex : (this.appCarouselOf as T[]).length - 1;

		this.currentIndexSubject$.next(newIndex);
	}
}
