export interface PaginationInterface<T> {
	count: number,
	next: string,
	previous: string,
	results: Array<T>
}
