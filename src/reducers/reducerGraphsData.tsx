import { FetchDataAction, GraphDataArray } from '../interfaces/actionsInterface';


const FETCH_GRAPH_DATA = "FETCH_GRAPH_DATA";
const SET_LOADING = "SET_LOADING";

const initialState = {
	graphListData: null,
	isInitialLoading: false
};

interface InitialStateProps {
	graphListData: any,
	isInitialLoading: boolean
}

const graphData = (state:InitialStateProps = initialState, action:FetchDataAction) => {
	switch(action.type) {
		case FETCH_GRAPH_DATA:
			return {
				...state,
				graphListData: action.data
			};
		case SET_LOADING:
			return {
				...state,
				isInitialLoading: action.data
			};
		default:
			return state;
	}
}

export default graphData;