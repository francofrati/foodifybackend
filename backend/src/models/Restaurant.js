const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema(
    {
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
            // unique: true
        },
        password: {
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
            default: true
        },
        delivery:{
            type:Boolean,
            default: true
        },
        plus:{
            type:Boolean,
            default:true
        },
        localStorageToken: {
            type: String
        },
        deleted: {
            type: Boolean,
            default: false
        },
        rating:{
            type:Number,
            default: 3
        },
        delivery_time:{
            type:Number,
            default: 20
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