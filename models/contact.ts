import { Schema, model, models } from 'mongoose';

export default models.Contact
	? models.Contact
	: model(
			'Contact',
			new Schema(
				{
					_id: Schema.Types.ObjectId,
					email: String,
					tel: String,
					img: {
						filename: String,
						width: Number,
						height: Number,
					},
				},
				{
					collection: 'contact',
				}
			)
	  );
