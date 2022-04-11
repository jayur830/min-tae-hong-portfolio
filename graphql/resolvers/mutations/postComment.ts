import About from '@root/models/about';

export const postComment = async (parent: any, args: { comment: string; date: string }) => {
	try {
		await About.findOneAndUpdate(
			{},
			{
				$push: {
					comments: args,
				},
			},
			{ _id: false }
		).exec();
		return true;
	} catch (e) {
		return false;
	}
};
