import { Schema, model, models } from 'mongoose';

export default models.Dramas
	? models.Dramas
	: model(
			'Dramas',
			new Schema(
				{
					_id: Schema.Types.ObjectId,
					title: String,
					year: Number,
					director: String,
					actors: [String],
					schedule: String,
					img: {
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
					collection: 'dramas',
				}
			)
	  );
