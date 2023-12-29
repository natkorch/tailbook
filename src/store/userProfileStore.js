import { create } from "zustand";

const useUserProfileStore = create((set) => ({
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),

	// used to update post count in the profile header
	incrementPostCount: (post) =>
		set((state) => ({
			userProfile: {
				...state.userProfile,
				posts: [post.id, ...state.userProfile.posts],
			},
		})),
	decrementPostCount: (postId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile,
				posts: state.userProfile.posts.filter((id) => id !== postId),
			},
		})),
}));

export default useUserProfileStore;
