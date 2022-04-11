import { Schema, model, models } from 'mongoose';

export default models.Footer
	? models.Footer
	: model(
			'Footer',
			new Schema(
				{
					_id: Schema.Types.ObjectId,
					sns: [
						{
							_id: false,
							name: String,
							url: String,
						},
					],
				},
				{
					collection: 'footer',
				}
			)
	  );
