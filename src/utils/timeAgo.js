export const timeAgo = (timestamp) => {
	const now = Date.now();
	const secondsAgo = Math.floor((now - timestamp) / 1000);

	if (secondsAgo < 60) {
		return `${secondsAgo}s ago`;
	} else if (secondsAgo < (60 * 60)) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo}m ago`;
	} else if (secondsAgo < (60 * 60 * 24)) {
		const hoursAgo = Math.floor((secondsAgo / (60 * 60)));
		return `${hoursAgo}h ago`;
	} else if (secondsAgo < (60 * 60 * 24 * 7)) {
		const daysAgo = Math.floor((secondsAgo / (60 * 60 * 24)));
		return `${daysAgo}d ago`;
	} else {
		const weeksAgo = Math.floor((secondsAgo / (60 * 60 * 24 * 7)));
		return `${weeksAgo}w ago`;
	}
};
