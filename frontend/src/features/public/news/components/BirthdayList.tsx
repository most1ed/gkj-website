export function BirthdayList() {
  const birthdays = {
    today: [
      { name: "Budi Santoso", age: 45 },
      { name: "Maria Wijaya", age: 32 },
    ],
    thisWeek: [
      { name: "John Susanto", date: "23 Januari", age: 28 },
      { name: "Linda Kusuma", date: "24 Januari", age: 39 },
      { name: "David Wijaya", date: "25 Januari", age: 50 },
      { name: "Sarah Gunawan", date: "26 Januari", age: 35 },
    ],
    nextWeek: [
      { name: "Michael Tanjung", date: "28 Januari", age: 42 },
      { name: "Jessica Lee", date: "29 Januari", age: 27 },
      { name: "Robert Salim", date: "30 Januari", age: 55 },
    ],
  };

  return (
    <section className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Ulang Tahun Jemaat</h2>
      
      {/* Today's Birthdays */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
          Hari Ini
        </h3>
        <div className="space-y-2">
          {birthdays.today.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 bg-primary/5 rounded-lg"
            >
              <span className="font-medium">{person.name}</span>
              <span className="text-sm text-muted-foreground">{person.age} tahun</span>
            </div>
          ))}
        </div>
      </div>

      {/* This Week's Birthdays */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Minggu Ini</h3>
        <div className="space-y-2">
          {birthdays.thisWeek.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-muted/50"
            >
              <div>
                <span className="font-medium">{person.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({person.age} tahun)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{person.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Week's Birthdays */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Minggu Depan</h3>
        <div className="space-y-2">
          {birthdays.nextWeek.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-muted/50"
            >
              <div>
                <span className="font-medium">{person.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({person.age} tahun)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{person.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
