const { Schema, model } = require("mongoose")

const reviewSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        restaurant_id: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        content: {
            type: String,
        },
        rate: {
            type: Number,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


reviewSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.hashPassword;
    },
});


module.exports = model("Review", reviewSchema)