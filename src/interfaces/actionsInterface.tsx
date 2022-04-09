export interface FetchDataAction {
	type: string,
	data: any
};

export interface GraphDataArray {
	[index: number]: string
}

export interface InitialLoad {
	type: 'SET_LOADING'
	data: boolean
  }