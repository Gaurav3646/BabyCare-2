import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookingAppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (appointment) => {
    // Handle form submission logic here, e.g., API call
    console.log('Appointment Details:', appointment);
    setShowForm(false);
  };

  // Dummy data for available time slots
  const dummyAvailableSlots = {
    '2024-03-01': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
    '2024-03-02': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
    '2024-03-03': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
    '2024-03-04': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
    '2024-03-05': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
    '2024-03-06': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
    // Add more dates and time slots as needed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-start items-center gap-4 mb-4'>
      <Link
         to="/user/appointment/doctor"
        className="text-gray-600 hover:text-gray-800  inline-block"
 >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
              </Link>
      <h1 className="text-xl font-bold ">Appointment Booking</h1></div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-sm font-semibold mb-2">Select Date</h2>
          <div className="mb-4">
            <input
              type="date"
              className="border rounded px-4 py-2 w-full"
              onChange={(e) => handleDateSelect(e.target.value)}
            />
          </div>
          <h2 className="text-sm font-semibold mb-2">Select Time Slot</h2>
          <div className="space-y-2">
            {selectedDate &&
              (dummyAvailableSlots[selectedDate] ? (
                dummyAvailableSlots[selectedDate].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSlotSelect(slot)}
                    className={`block w-full border rounded px-4 py-2 ${
                     selectedTimeSlot && selectedTimeSlot.startTime === slot.startTime && selectedTimeSlot.endTime === slot.endTime
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                   {`${slot.startTime} - ${slot.endTime}`}
                  </button>
                ))
              ) : (
                <p>No available slots for selected date</p>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
         
            <div>
              <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
              <AppointmentForm
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onSubmit={handleFormSubmit}
              />
            </div>
         
        </div>
      </div>
    </div>
  );
};

const AppointmentForm = ({ selectedDate, selectedTimeSlot, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const childName = e.target.elements.childName.value;
    const age = e.target.elements.age.value;
    const reason = e.target.elements.reason.value;
    const additionalDetails = e.target.elements.additionalDetails.value;

    const appointment = {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      childName,
      age,
      reason,
      additionalDetails,
    };
    onSubmit(appointment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
          Child's Name:
        </label>
        <input type="text" id="childName" name="childName" className="form-input mt-1 block w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age:
        </label>
        <input type="number" id="age" name="age" className="form-input mt-1 block w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Appointment:
        </label>
        <textarea id="reason" name="reason" className="form-textarea mt-1 block border rounded w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
          Additional Details:
        </label>
        <textarea id="additionalDetails" name="additionalDetails" className="form-textarea mt-1 block rounded w-full border" />
      </div>
      <div className='flex justify-center items-center'>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-secondary-dark">
        Book Appointment
      </button>
      </div>
    </form>
  );
};

export default BookingAppointmentForm;
