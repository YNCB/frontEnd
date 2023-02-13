import { instance, instanceWithAuth } from '../common';

interface getBoxListInterface {
	countView: number | null;
	language: string | null;
	lastLikeNum: number | null;
	lastPostId: number | null;
	lastReplyNum: number | null;
	orderKey: string;
	searchTitle: string | null;
	tags: string[];
	type: string;
}

interface headersType {
	accessToken: string;
}

interface postBoxInterface {
	title: string;
	tags: string[];
	type: string;
	language: string;
	level: number | null;
	content: string;
	problem_uri: string;
}

interface editBoxInterface {
	nickname: string;
	postId: string;
	form: {
		title: string;
		tags: string[];
		type: string;
		language: string;
		level: number | null;
		content: string;
		problem_uri: string;
	};
}

interface getDetailBoxInterface {
	nickname: string;
	postId: string | null;
}

function getMainBoxList(data: getBoxListInterface, headers: headersType) {
	if (headers.accessToken) {
		return instanceWithAuth.post(`/codebox/`, data);
	}
	return instance.post(`/codebox/`, data);
}

function getUserBoxList(
	nickname: string,
	data: getBoxListInterface,
	accessToken: string,
) {
	return accessToken
		? instanceWithAuth.post(`/codebox/${nickname}`, data)
		: instance.post(`/codebox/${nickname}`, data);
}

function postBox(body: postBoxInterface) {
	return instanceWithAuth.post(`/codebox/write`, body);
}

function getEditBox(path: getDetailBoxInterface) {
	return instanceWithAuth.get(`/codebox/${path.nickname}/${path.postId}/edit`);
}

function putEditBox(body: editBoxInterface) {
	return instanceWithAuth.put(
		`/codebox/${body.nickname}/${body.postId}/edit`,
		body.form,
	);
}

function getDetailBox(path: getDetailBoxInterface, token: boolean) {
	if (token)
		return instanceWithAuth.get(`/codebox/${path.nickname}/${path.postId}`);

	return instance.get(`/codebox/${path.nickname}/${path.postId}`);
}

function deleteMyBox(path: getDetailBoxInterface) {
	return instanceWithAuth.delete(`/codebox/${path.nickname}/${path.postId}`);
}

function postLike(path: getDetailBoxInterface) {
	return instanceWithAuth.post(`/codebox/${path.nickname}/${path.postId}/like`);
}

export {
	getMainBoxList,
	getUserBoxList,
	postBox,
	getEditBox,
	putEditBox,
	getDetailBox,
	deleteMyBox,
	postLike,
};
