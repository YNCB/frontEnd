import { instance, instanceWithAuth } from "../common";

function postFollow(body: {userId: number}) {
    return instanceWithAuth.post(`/codebox/follow/add`, body)
}
function deleteFollow(path: {followId: number}) {
    return instanceWithAuth.delete(`/codebox/follow/${path.followId}`)
}

function getFollower() {
    return instanceWithAuth.get(`/codebox/follow/follower`)
}

function getFollowing() {
    return instanceWithAuth.get(`/codebox/follow/following`)
}

export { postFollow, deleteFollow, getFollower, getFollowing }