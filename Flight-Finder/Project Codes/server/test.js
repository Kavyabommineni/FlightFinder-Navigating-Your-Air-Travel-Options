import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User, Flight, Booking } from './schemas.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FlightBookingMERN', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  insertData();
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
});

// Insert Data Function
async function insertData() {
  try {
    // 1. Insert User
    const hashedPassword = await bcrypt.hash('user1234', 10);
    const user = new User({
      username: 'john_doe1',
      email: 'john1@example.com',
      usertype: 'customer',
      password: hashedPassword,
      approval: 'approved'
    });
    const savedUser = await user.save();
    console.log('✅ User saved:', savedUser._id);

    // 2. Insert Flight
    const flight = new Flight({
      flightName: 'SkyJet 1011',
      flightId: 'SJ1011',
      origin: 'New York',
      destination: 'London',
      departureTime: '2025-07-01T10:00:00',
      arrivalTime: '2025-07-01T20:00:00',
      basePrice: 500,
      totalSeats: 150
    });
    const savedFlight = await flight.save();
    console.log('✅ Flight saved:', savedFlight._id);

    // 3. Insert Booking
    const booking = new Booking({
      user: savedUser._id,
      flight: savedFlight._id,
      flightName: savedFlight.flightName,
      flightId: savedFlight.flightId,
      departure: flight.origin,
      destination: flight.destination,
      email: savedUser.email,
      mobile: '1234167890',
      passengers: [
        { name: 'John Doe1', age: 30 },
        { name: 'Jane Doe', age: 28 }
      ],
      totalPrice: 1000,
      journeyDate: '2025-07-01',
      journeyTime: '10:00 AM',
      seatClass: 'economy',
      seats: 'E-1, E-2'
    });
    const savedBooking = await booking.save();
    console.log('✅ Booking saved:', savedBooking._id);

    // Finish
    mongoose.connection.close();
    console.log('✅ All data inserted and DB connection closed.');

  } catch (err) {
    console.error('❌ Error inserting data:', err);
    mongoose.connection.close();
  }
}