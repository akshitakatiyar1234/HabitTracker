import mongoose from 'mongoose';

const url = 'mongodb+srv://akshita:ak1234@cluster0.aoxpnce.mongodb.net/HabitTracker?retryWrites=true&w=majority&appName=Cluster0';

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB is connected using mongoose");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}