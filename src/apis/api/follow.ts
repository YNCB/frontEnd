import { instanceWithAuth } from "../common";

function postFollow(body: {userId: number}) {
    return instanceWithAuth.post(`/codebox/follow/${body.userId}`)
}

function deleteFollow(path: {userId: number}) {
    return instanceWithAuth.delete(`/codebox/follow/${path.userId}`)
}

function getFollower() {
    return instanceWithAuth.get(`/codebox/follow/follower`)
}

function getFollowing() {
    return instanceWithAuth.get(`/codebox/follow/following`)
}

export { postFollow, deleteFollow, getFollower, getFollowing }