import {
	Directive,
	Input,
	ViewContainerRef,
	TemplateRef,
	OnChanges,
	SimpleChanges,
	OnDestroy,
} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnDestroy {
	@Input() appPaginationOf: T[] | undefined | null;
	@Input() appPaginationChankSize = 4;

	private pageIndexes: number[] = [];

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroySubject$ = new Subject<boolean>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<IPaginationContext<T>>,
	) {}

	ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
		if (appPaginationOf) {
			if (!this.appPaginationOf?.length) {
				this.viewContainerRef.clear();
				return;
			}
		}

		if (appPaginationOf || appPaginationChankSize) {
			this.updateIndexes();
		}
	}

	ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}

	private updateIndexes(): void {
		const current = this.currentIndex$.value;
		if (current < this.pageIndexes.length) {
			this.currentIndex$.next(current);
		} else {
			this.currentIndex$.next(0);
		}
	}
}
