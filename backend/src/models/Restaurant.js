const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true
        },
        image:{
            type:String
        },
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String, 
            require: true,
            unique: true
        },
        hashPassword: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        },
        selling_foods: [
            {
                type: Schema.Types.ObjectId,
                ref: "Food"
            }
        ],
        online_payment:{
            type: Boolean,
        },
        delivery:{
            type:Boolean
        },
        plus:{
            type:Boolean
        },
        localStorageToken: {
            type: String
        },
        deleted: {
            type: Boolean,
            default: false
        }
    }
)


restaurantSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject._v;
      delete returnedObject.hashPassword;
    },
  });

module.exports = model("Restaurant", restaurantSchema)