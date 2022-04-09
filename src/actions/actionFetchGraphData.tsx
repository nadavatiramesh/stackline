import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { GraphDataArray, InitialLoad } from '../interfaces/actionsInterface';

const FETCH_GRAPH_DATA = "FETCH_GRAPH_DATA";
const SET_LOADING = "SET_LOADING";
// const ADD_GRAPH_DATA = "ADD_GRAPH_DATA";

const getGraphData = (dispatch:any) => {
	let result = {
		sales: [],
		reviews: []
	}
	fetch('./mockData/graphData.json')
	.then(resp => resp.json())
	.then((resp) => {
		setTimeout(() => {
			result["sales"] = resp[0].sales;
			result["reviews"] = resp[0].reviews;
			dispatch(isInitLoading(false));
		}, 2000);
		});
	return result;
}

export const isInitLoading = (isLoading: boolean): InitialLoad => {
	return { type: SET_LOADING, data: isLoading }
};

export const addData = (payloadData: GraphDataArray) => {
	return { type: FETCH_GRAPH_DATA, data: payloadData }
};

export const fetchGraphData = () => {
	return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
		dispatch(isInitLoading(true));
		const resultData = getGraphData(dispatch);
		dispatch(addData(resultData));
	}
};