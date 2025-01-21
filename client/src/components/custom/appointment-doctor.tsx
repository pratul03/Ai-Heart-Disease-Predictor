function AppointmentDoctor() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md w-96">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-2">
                <h2 className="text-lg font-semibold">Dr. John Doe</h2>
                <p className="text-sm text-gray-400">Dentist</p>
                <p className="text-sm text-gray-400">10 years experience</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDoctor;
