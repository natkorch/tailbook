import { create } from "zustand";

const usePostStore = create((set) => ({
	posts: [],
	createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
	deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
	setPosts: (posts) => set({ posts }),
	addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
	likePost: (postId, likedBy, isLiked) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						likes: isLiked ? post.likes.filter((x) => x !== likedBy) : [...post.likes, likedBy],
					};
				}
				return post;
			}),
		})),
}));

export default usePostStore;
