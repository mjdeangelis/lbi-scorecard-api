import mongoose from 'mongoose';

import { connectToMongoose } from '../services/mongoose';
import Player from '../models/Player';

const run = async () => {
    await connectToMongoose();
    await Player.updateMany({}, { resultsUrl: null });

    const small = new Tank({ size: 'small' });
        small.save(function (err) {
        if (err) return handleError(err);
        // saved!
        });
    await mongoose.connection.close();
};

run();
