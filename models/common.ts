import { Schema, model, models } from 'mongoose';

export default models.Common
	? models.Common
	: model(
			'Common',
			new Schema(
				{
					_id: Schema.Types.ObjectId,
					title: String,
					headerTitle: String,
				},
				{
					collection: 'common',
				}
			)
	  );
