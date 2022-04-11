import { Schema, model, models } from 'mongoose';

export default models.Movies
	? models.Movies
	: model(
			'Movies',
			new Schema(
				{
					_id: Schema.Types.ObjectId,
					title: String,
					year: Number,
					director: String,
					actors: [String],
					awards: [String],
					img: {
						filename: String,
						width: Number,
						height: Number,
					},
					video: {
						filename: String,
						width: Number,
						height: Number,
					},
					scenes: [
						{
							_id: false,
							filename: String,
							width: Number,
							height: Number,
						},
					],
				},
				{
					collection: 'movies',
				}
			)
	  );
