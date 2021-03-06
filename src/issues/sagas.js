// @flow
import { type Saga } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';

import {
    getRepoIssuesComplete,
    ISSUES_GET_STARRED_REQUEST,
    type ExpectedApiResponse
} from './ducks';
import { get } from 'utils/http';

/**
 * Fetch all open issues for a given repo. This is
 * currently filtered to only display issues with a 'help wanted' label.
 *
 * @param {FSAModel} action - Redux action object
 */
export const getRepoIssuesSaga = function* (action: FSAModel): Saga<void>{
    const { payload: { repoName } = {} } = action;

    try {
        if( ! repoName)
            return;

        const resp: ExpectedApiResponse = yield call(get, `https://api.github.com/repos/${repoName}/issues?labels=help+wanted`);

        yield put(getRepoIssuesComplete(repoName, resp));
    }
    catch (error){
        yield put(getRepoIssuesComplete(repoName, error, true));
    }
}

export default function* (): Saga<void>{
    yield takeEvery(ISSUES_GET_STARRED_REQUEST, getRepoIssuesSaga);
}
