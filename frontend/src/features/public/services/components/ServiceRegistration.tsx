export function ServiceRegistration() {
  return (
    <section className="bg-primary/5 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Bergabung dalam Pelayanan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Daftarkan diri Anda untuk bergabung dalam pelayanan atau komunitas
        </p>
      </div>

      <form className="max-w-2xl mx-auto space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informasi Pribadi</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="age">
                Usia
              </label>
              <input
                type="number"
                id="age"
                className="w-full px-3 py-2 border rounded-lg bg-background"
                required
              />
            </div>
          </div>
        </div>

        {/* Service Interest */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Minat Pelayanan</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="service">
                Bidang Pelayanan yang Diminati
              </label>
              <select
                id="service"
                className="w-full px-3 py-2 border rounded-lg bg-background"
                required
              >
                <option value="">Pilih Bidang Pelayanan</option>
                <option value="paduan-suara">Paduan Suara</option>
                <option value="multimedia">Multimedia</option>
                <option value="penyambut">Penyambut Jemaat</option>
                <option value="pemusik">Pemusik</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="experience">
                Pengalaman/Keterampilan
              </label>
              <textarea
                id="experience"
                className="w-full px-3 py-2 border rounded-lg bg-background h-24"
                placeholder="Ceritakan pengalaman atau keterampilan Anda yang relevan dengan pelayanan yang diminati..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Community Interest */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Minat Komunitas</h3>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="community">
              Komunitas yang Diminati
            </label>
            <select
              id="community"
              className="w-full px-3 py-2 border rounded-lg bg-background"
            >
              <option value="">Pilih Komunitas</option>
              <option value="pemuda">Komunitas Pemuda</option>
              <option value="wanita">Komunitas Wanita</option>
              <option value="lansia">Komunitas Lansia</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Daftar Sekarang
          </button>
        </div>
      </form>
    </section>
  );
}
